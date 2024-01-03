"use client";

import { cn } from "@/lib/utils";
import React from "react";
import LogoSVG from "../logo";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AppWriteClientService from "@/appwrite/client";
import { useAuth } from "../../appwrite/auth";
import { LogIn } from "lucide-react";
import Image from "next/image";

import CredentialImage from "@assets/credential.svg";
import { getCookie } from "@/lib/cookie";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Props = {};

export default function LoginPage({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const auth = useAuth();
  const AppwriteClient = React.useMemo(() => {
    return new AppWriteClientService();
  }, []);

  const onSubmit = form.handleSubmit(async (data) => {
    await AppwriteClient.login(data.email, data.password);
    const cookie = getCookie(
      "a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    );
    // AppwriteClient.setSession(cookie);
    localStorage.setItem(
      "cookieFallback",
      JSON.stringify({
        ["a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID]: cookie,
      })
    );

    const account = await AppwriteClient.getSession();
    if (account.labels?.includes("admin")) {
      auth.setAccount(account);
    } else {
      toast.error("You are not an admin");
    }
  });

  return (
    <div className="w-full h-full relative lg:grid lg:grid-cols-3 grid-flow-row overflow-auto">
      <div
        className={cn(
          "absolute lg:relative", // Position
          "lg:col-span-2 w-full h-full pt-5", // Container
          "lg:grid place-items-end" // Display
        )}
      >
        <div className="flex flex-col items-center justify-start w-full h-auto">
          <div className="flex w-auto h-auto items-center gap-2">
            <LogoSVG className="text-primary w-10 h-10 aspect-square" />
            <h2 className="text-4xl font-bold text-primary font-rubik_vinyl">
              ApexLens
            </h2>
          </div>

          <Image
            src={CredentialImage}
            width={500}
            height={500}
            className="w-full h-auto max-w-xl"
            alt="Credentials"
          />
        </div>
      </div>
      <div
        className={cn(
          "mt-[40vh] lg:mt-0 min-h-[60vh] lg:min-h-full", // Position
          "lg:col-span-1 w-full lg:h-full", // Container
          "lg:grid place-items-center", // Display
          "border-l p-6", // Border
          "bg-foreground/20 backdrop-filter backdrop-blur-[2px] supports-[backdrop-filter]:bg-foreground/10", // Background
          "bg-background/90 backdrop-blur-sm supports-[backdrop-filter]:bg-background/70" // Background
        )}
      >
        <div className="flex flex-col items-center justify-start w-full h-auto">
          <h2 className="text-2xl font-bold text-center text-foreground font-noto_serif_georgian">
            Welcome to ApexLens
          </h2>
          <p className="text-base text-center text-muted-foreground font-noto_serif_georgian">
            Please login to continue to the dashboard
          </p>

          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col items-start justify-start w-full h-auto max-w-80 mt-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormDescription className="">
                Forgot your password?{" "}
                <a href="/forgot-password" className="text-primary">
                  Reset
                </a>
              </FormDescription>

              <Button type="submit" variant={"outline"} className="mt-4 gap-4">
                <LogIn className="w-5 h-5" />
                Login
              </Button>

              <FormDescription className="mt-2">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-primary">
                  Register
                </a>
              </FormDescription>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
