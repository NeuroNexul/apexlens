"use client";

import { account } from "@/lib/appwrite-client";
import { Models } from "appwrite";
import React from "react";
import LoginPage from "../login/page";

interface AuthData {
  account?: Models.User<Models.Preferences>;
  setAccount: React.Dispatch<
    React.SetStateAction<Models.User<Models.Preferences> | undefined>
  >;
}

export const AuthContext = React.createContext<AuthData>({
  account: undefined,
  setAccount: () => {},
});

export const AuthProvider = ({
  children,
  defaultAccount,
}: {
  children: React.ReactNode;
  defaultAccount: Models.User<Models.Preferences>;
}) => {
  const [currentAccount, setCurrentAccount] = React.useState<
    Models.User<Models.Preferences> | undefined
  >(defaultAccount);

  React.useEffect(() => {
    account
      .get()
      .then((account) => {
        setCurrentAccount(account);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Something went wrong");
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
