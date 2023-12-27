import { cookies } from "next/headers";
import { AppWriteService } from "./client";
import type { Models } from "appwrite";

const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;

const AppwriteServerService = {
  async getSession(): Promise<Models.User<Models.Preferences> | null> {
    const sessionNames = [
      "a_session_" + appwriteProject.toLowerCase(),
      "a_session_" + appwriteProject.toLowerCase() + "_legacy",
    ];

    const cookieStore = cookies();
    const hash =
      cookieStore.get(sessionNames[0]) ??
      cookieStore.get(sessionNames[1]) ??
      null;
    AppWriteService.setSession(hash ? hash.value : "");

    let account;
    try {
      account = await AppWriteService.getSession();
    } catch (err) {
      account = null;
    }

    return account;
  },
};

export default AppwriteServerService;
