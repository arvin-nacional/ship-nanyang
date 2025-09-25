import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.S3_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    // Check if S3 credentials are configured
    if (!process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY || !process.env.S3_BUCKET) {
      console.warn('S3 credentials or bucket name not configured.');
      return NextResponse.json({
        success: false,
        uploadedFiles: [],
        failedFiles: [],
        error: 'S3 credentials not configured'
      }, { status: 500 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        uploadedFiles: [],
        failedFiles: [],
        error: 'No files provided'
      }, { status: 400 });
    }

    const bucketName = process.env.S3_BUCKET;
    const uploadedFiles: Array<{ name: string; url: string; key: string }> = [];
    const failedFiles: Array<{ name: string; error: string }> = [];

    for (const file of files) {
      try {
        // Generate unique key for the file
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.name.split('.').pop();
        const key = `quote-requests/${timestamp}-${randomString}.${fileExtension}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to S3
        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: buffer,
          ContentType: file.type,
          ContentDisposition: `attachment; filename="${file.name}"`,
          Metadata: {
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
          },
        });

        await s3Client.send(command);

        // Generate public URL
        const url = `https://${bucketName}.s3.${process.env.S3_REGION || 'ap-southeast-2'}.amazonaws.com/${key}`;

        uploadedFiles.push({
          name: file.name,
          url,
          key,
        });

        console.log(`Successfully uploaded: ${file.name}`);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        failedFiles.push({
          name: file.name,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: uploadedFiles.length > 0,
      uploadedFiles,
      failedFiles,
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({
      success: false,
      uploadedFiles: [],
      failedFiles: [],
      error: 'Internal server error'
    }, { status: 500 });
  }
}
