import sdk from "node-appwrite";

let client = new sdk.Client();

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const appwriteKey = process.env.APPWRITE_API_KEY as string;

client
  .setEndpoint(appwriteEndpoint) // Your API Endpoint
  .setProject(appwriteProject) // Your project ID
  .setKey(appwriteKey) // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert

export default client;

export const users = new sdk.Users(client);
export const account = new sdk.Account(client);
