import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.S3_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

export interface UploadResult {
  success: boolean;
  uploadedFiles: Array<{
    name: string;
    url: string;
    key: string;
  }>;
  failedFiles: Array<{
    name: string;
    error: string;
  }>;
}

export async function uploadMultipleFilesToS3(files: File[]): Promise<UploadResult> {
  try {
    // Create FormData to send files to API route
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file);
    });

    // Call the server-side upload API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        uploadedFiles: [],
        failedFiles: files.map(file => ({
          name: file.name,
          error: errorData.error || 'Upload failed'
        }))
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      uploadedFiles: [],
      failedFiles: files.map(file => ({
        name: file.name,
        error: error instanceof Error ? error.message : 'Network error'
      }))
    };
  }
}

export async function uploadSingleFileToS3(file: File): Promise<{
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}> {
  const result = await uploadMultipleFilesToS3([file]);
  
  if (result.success && result.uploadedFiles.length > 0) {
    const uploadedFile = result.uploadedFiles[0];
    return {
      success: true,
      url: uploadedFile.url,
      key: uploadedFile.key,
    };
  } else if (result.failedFiles.length > 0) {
    return {
      success: false,
      error: result.failedFiles[0].error,
    };
  } else {
    return {
      success: false,
      error: 'Unknown error occurred',
    };
  }
}
