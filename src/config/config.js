const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL || "https://nyc.cloud.appwrite.io/v1",
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "6871fe0d003cf34d87e5",
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "6871fec100123a97482c",
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID || "6871fee5001d11b8a539",
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID || "6871ffee001de90d6890",
};

export default conf;
