import { Client, Account } from "appwrite";

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;

export class AppWriteService {
  // Private properties
  protected client: Client;
  protected account: Account;

  // api keys
  appwriteEndpoint = appwriteEndpoint;
  appwriteProject = appwriteProject;

  constructor() {
    this.client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(appwriteProject);

    this.account = new Account(this.client);
  }

  // Public methods
  setSession(hash: string) {
    const authCookies: any = {};
    authCookies["a_session_" + appwriteProject] = hash;
    this.client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
  }

  async getSession() {
    return await this.account.get();
  }

  async deleteSession() {
    try {
      await this.account.deleteSession("current");
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong");
    }
  }
}
