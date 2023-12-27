import { Client, Account, ID } from "appwrite";
import { toast } from "sonner";

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;

const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProject);

export default client;

export const account = new Account(client);

export const AppWriteService = {
  setSession(hash: string) {
    const authCookies: any = {};
    authCookies["a_session_" + appwriteProject] = hash;
    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
  },

  async getSession() {
    return await account.get();
  },

  async login(email: string, password: string) {
    try {
      // const session = await account.createEmailSession(email, password);
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status >= 400) {
        const json = await res.json();
        toast.error(json.message || "Something went wrong");
      }

      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  },

  async logout() {
    try {
      await account.deleteSession("current");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  },
};
