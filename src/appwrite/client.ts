"use client";

import { toast } from "sonner";
import { AppWriteService } from "./appwrite";

export default class AppwriteClientService extends AppWriteService {
  async login(email: string, password: string) {
    try {
      const session = await this.account.createEmailSession(email, password);
      // const res = await fetch("/api/auth", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (res.status >= 400) {
      //   const json = await res.json();
      //   toast.error(json.message || "Something went wrong");
      // }

      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  }
}
