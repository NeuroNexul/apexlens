import "server-only";
import { cookies } from "next/headers";
import type { Models } from "node-appwrite";
import { AppWriteService } from "./appwrite";

export default class AppwriteServerService extends AppWriteService {
  async getServerSession(): Promise<Models.User<Models.Preferences> | null> {
    const sessionNames = [
      "a_session_" + this.appwriteProject.toLowerCase(),
      "a_session_" + this.appwriteProject.toLowerCase() + "_legacy",
    ];

    const cookieStore = cookies();
    const hash =
      cookieStore.get(sessionNames[0]) ??
      cookieStore.get(sessionNames[1]) ??
      null;
    this.setSession(hash ? hash.value : "");

    let account: Models.User<Models.Preferences> | null = null;
    try {
      account = await this.getSession();
    } catch (err) {
      console.error(err);
      account = null;
    }

    return account;
  }
}
