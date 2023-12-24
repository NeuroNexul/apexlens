import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Rubik_Vinyl, Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  return (
    <html
      lang="en"
      className={cn(
        "w-full h-full relative",
        theme?.value === "light" ? "" : "dark"
      )}
    >
      <body
        className={cn(
          "w-full h-full relative bgi-pattern",
          "bg-background font-sans antialiased",
          interFont.className,
          interFont.variable,
          rubikFont.variable,
          notoSerifGeorgianFont.variable
        )}
      >
        <NavBar>{children}</NavBar>

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
