// Read-only audit: outputs counts/index status, never profile details or secrets.
const { loadEnvConfig } = require("@next/env");
const { MongoClient } = require("mongodb");

loadEnvConfig(process.cwd(), false, { info() {}, error() {} });

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  try {
    await client.connect();
    const users = client.db("sd-express").collection("users");
    const [duplicates, missingIds, indexes, incompleteVerified] = await Promise.all([
      users.aggregate([
        { $group: { _id: "$clerkId", count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
        { $count: "groups" },
      ]).toArray(),
      users.countDocuments({ $or: [{ clerkId: null }, { clerkId: "" }] }),
      users.listIndexes().toArray(),
      users.countDocuments({ verified: true, $or: [
        { privacyPolicyAccepted: { $ne: true } }, { address: null },
        { firstName: { $in: [null, ""] } }, { lastName: { $in: [null, ""] } },
      ] }),
    ]);
    const result = {
      duplicateClerkIdGroups: duplicates[0]?.groups || 0,
      usersMissingClerkId: missingIds,
      hasUniqueClerkIdIndex: indexes.some((index) =>
        index.unique === true && index.key.clerkId === 1 && Object.keys(index.key).length === 1
      ),
      verifiedUsersMissingBasicRequiredDetails: incompleteVerified,
    };
    console.log(JSON.stringify(result, null, 2));
    if (result.duplicateClerkIdGroups || result.usersMissingClerkId) process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Read-only onboarding audit failed (" + error.name +
    (error.code ? ": " + error.code : "") + ").");
  process.exitCode = 1;
});
