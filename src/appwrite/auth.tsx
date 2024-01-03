"use client";

import { Models } from "appwrite";
import React from "react";
import LoginPage from "../components/login/page";
import AppwriteClientService from "./client";
import { getCookie } from "@/lib/cookie";
import { toast } from "sonner";
import PageLoader from "@/components/loaders/page_loader";

interface AuthData {
  account?: Models.User<Models.Preferences> | null;
  setAccount: React.Dispatch<
    React.SetStateAction<Models.User<Models.Preferences> | null>
  >;
}

export const AuthContext = React.createContext<AuthData>({
  account: null,
  setAccount: () => {},
});

export const AuthProvider = ({
  children,
  defaultAccount,
}: {
  children: React.ReactNode;
  defaultAccount: Models.User<Models.Preferences> | null;
}) => {
  const [currentAccount, setCurrentAccount] =
    React.useState<Models.User<Models.Preferences> | null>(defaultAccount);
  const [loading, setLoading] = React.useState(!defaultAccount);

  const AppwriteClient = React.useMemo(() => {
    return new AppwriteClientService();
  }, []);

  React.useEffect(() => {
    const cookie = getCookie(
      "a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    );
    // AppWriteService.setSession(cookie);
    localStorage.setItem(
      "cookieFallback",
      JSON.stringify({
        ["a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID]: cookie,
      })
    );

    AppwriteClient.getSession()
      .then((res) => {
        if (res.labels?.includes("admin")) {
          setCurrentAccount(res);
          setLoading(false);
        } else {
          toast.error("You are not an admin");
          setCurrentAccount(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setCurrentAccount(null);
        setLoading(false);
      });
  }, [AppwriteClient]);

  const isUserLoggedIn = !!currentAccount?.$id;

  return (
    <AuthContext.Provider
      value={{
        account: currentAccount,
        setAccount: setCurrentAccount,
      }}
    >
      {loading ? <PageLoader /> : isUserLoggedIn ? children : <LoginPage />}
      {/* {children} */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
