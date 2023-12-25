"use client";

import { Client, Account, ID } from "appwrite";
import { setCookie } from "./cookie";
import { toast } from "sonner";

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;

const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProject);

export default client;

export const account = new Account(client);

export async function login(email: string, password: string) {
  try {
    const session = await account.createEmailSession(email, password);
    const token = await account.createJWT();
    setCookie("a_session_jwt", token.jwt, 30);

    toast.success("Logged in successfully");
  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    setCookie("a_session_jwt", "", 0);

    toast.success("Logged out successfully");
  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
  }
}
