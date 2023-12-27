import { NextRequest, NextResponse } from "next/server";
import * as setCookie from "set-cookie-parser";

const AppwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const AppwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const SsrHostname = process.env.NEXT_PUBLIC_SSR_HOSTNAME as string;
const AppwriteHostname = process.env.NEXT_PUBLIC_APPWRITE_HOSTNAME as string;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const clientIP = (
      request.ip ||
      request.headers.get("X-Forwarded-For") ||
      ""
    )
      .split(",")
      .pop()
      ?.trim();

    const response = await fetch(`${AppwriteEndpoint}/account/sessions/email`, {
      method: "POST",
      headers: {
        // ":authority:": AppwriteHostname,
        // ":method:": "POST",
        // ":path:": "/v1/account/sessions/email",
        // ":scheme:": "https",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") ?? "",
        Dnt: "1",
        Origin: SsrHostname,
        Referer: SsrHostname,
        // Host: SsrHostname,

        "Sec-Ch-Ua": request.headers.get("sec-ch-ua") ?? "",
        "Sec-Ch-Ua-Mobile": request.headers.get("sec-ch-ua-mobile") ?? "",
        "Sec-Ch-Ua-Platform": request.headers.get("sec-ch-ua-platform") ?? "",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": request.headers.get("user-agent") ?? "",

        "x-appwrite-project": AppwriteProject,
        "X-Appwrite-Response-Format": "1.4.0",
        "X-Fallback-Cookies": "[]",
        "X-Sdk-Language": "web",
        "X-Sdk-Name": "Web",
        "X-Sdk-Platform": "client",
        "X-Sdk-Version": "13.0.1",

        "X-Forwarded-For": clientIP ?? "",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json();

    if (json.code >= 400) {
      console.error(json.message);
      return NextResponse.json(
        {
          message: json.message,
          ip: request.ip,
          "X-Forwarded-For": request.headers.get("X-Forwarded-For") ?? "",
          clientIP,
        },
        { status: 400 }
      );
    }

    const ssrHostname =
      SsrHostname === "localhost" ? SsrHostname : "" + SsrHostname;
    const appwriteHostname =
      AppwriteHostname === "localhost"
        ? AppwriteHostname
        : "." + AppwriteHostname;

    const cookiesStr = (response.headers.get("set-cookie") ?? "")
      .split(appwriteHostname)
      .join(ssrHostname);

    const cookiesArray = setCookie.splitCookiesString(cookiesStr);
    const cookiesParsed = cookiesArray.map((cookie: any) =>
      setCookie.parseString(cookie)
    );

    const nextJsResponse = NextResponse.json({
      ...json,
      extra: {
        ip: request.ip,
        "X-Forwarded-For": request.headers.get("X-Forwarded-For") ?? "",
        clientIP,
      },
    });

    for (const cookie of cookiesParsed) {
      nextJsResponse.cookies.set(cookie.name, cookie.value, {
        domain: cookie.domain,
        secure: cookie.secure,
        sameSite: cookie.sameSite as any,
        path: cookie.path,
        maxAge: cookie.maxAge,
        httpOnly: false,
        expires: cookie.expires,
      });
    }

    return nextJsResponse;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
