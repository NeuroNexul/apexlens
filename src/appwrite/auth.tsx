"use client";

import { Models } from "appwrite";
import React from "react";
import LoginPage from "../components/login/page";
import { AppWriteService } from "./client";
import { getCookie } from "@/lib/cookie";
import { toast } from "sonner";

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

  React.useEffect(() => {
    const cookie = getCookie(
      "a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    );
    AppWriteService.setSession(cookie);
    localStorage.setItem(
      "cookieFallback",
      JSON.stringify({
        ["a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID]: cookie,
      })
    );

    AppWriteService.getSession()
      .then((res) => {
        setCurrentAccount(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const isUserLoggedIn = !!currentAccount?.$id;

  return (
    <AuthContext.Provider
      value={{
        account: currentAccount,
        setAccount: setCurrentAccount,
      }}
    >
      {isUserLoggedIn ? children : <LoginPage />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
