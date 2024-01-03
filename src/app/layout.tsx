import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, Rubik_Vinyl, Noto_Serif_Georgian } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/appwrite/auth";
import type { Models } from "appwrite";
import AppwriteServerService from "@/appwrite/server";

import "./globals.css";
// import "codemirror/lib/codemirror.css";
import "./mdx.scss";
import "@code-hike/mdx/dist/index.css";

const interFont = Inter({ subsets: ["latin"], variable: "--font-sans" });
const rubikFont = Rubik_Vinyl({
  weight: "400",
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-rubik-vinyl",
});
const notoSerifGeorgianFont = Noto_Serif_Georgian({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-noto-serif-georgian",
});

export const metadata: Metadata = {
  title: {
    template: "%s • ApexLens",
    default: "ApexLens",
  },
  description:
    "Visualize trends, identify roadblocks, and chart your course to success with a single, powerful interface. ApexLens: Your panoramic view to operational excellence.",
  manifest: "/manifest.webmanifest",
  generator: "Next.js",
  keywords: [
    "ApexLens",
    "Dashboard",
    "Analytics",
    "Operational Excellence",
    "ApexLens Dashboard",
  ],
  authors: [
    {
      name: "Arif Sardar",
      url: "https://arif.thedev.id",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#020817",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  const AppwriteServer = new AppwriteServerService();

  let currentAccount: Models.User<Models.Preferences> | null = null;
  // await AppwriteServer.getServerSession();

  return (
    <html
      lang="en"
      className={cn(
        "w-full h-full relative overflow-hidden",
        theme?.value === "light" ? "" : "dark"
      )}
    >
      <body
        className={cn(
          "w-full h-full relative bgi-pattern overflow-hidden",
          "bg-background font-sans antialiased",
          interFont.className,
          interFont.variable,
          rubikFont.variable,
          notoSerifGeorgianFont.variable
        )}
      >
        <AuthProvider defaultAccount={currentAccount}>
          <NavBar>{children}</NavBar>
        </AuthProvider>

        {/* Toasts */}
        <Toaster
          closeButton
          richColors
          theme={theme?.value === "light" ? "light" : "dark"}
        />
      </body>
    </html>
  );
}
