"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Address, Hex, zeroAddress } from "viem";
import { WebAuthn } from "@/libs/web-authn/service/web-authn";
import { saveUser } from "@/libs/factory";
import { getUser } from "@/libs/factory/getUser";
import { walletConnect } from "@/libs/wallet-connect/service/wallet-connect";

export type Me = {
  account: Address;
  keyId: Hex;
  pubKey: {
    x: Hex;
    y: Hex;
  };
};

function useMeHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState<Me | null>();
  const [isReturning, setIsReturning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationAttemps, setVerificationAttemps] = useState(3);

  function disconnect() {
    localStorage.removeItem("passkeys4337.me");
    setMe(null);
  }

  async function create(
    email: string,
    verificationCode: Record<number, string>
  ) {
    if (verificationAttemps <= 0) {
      return;
    }

    // sets loading display
    setIsLoading(true);

    try {
      const codesVerified: boolean = await verifyCodes(email, verificationCode);

      if (!codesVerified) {
        setVerificationAttemps(verificationAttemps - 1);
        return;
      }

      // makes passkey creation request
      const credential = await WebAuthn.create({ username: email });

      if (!credential) {
        return;
      }
      const user = await saveUser({
        id: credential.rawId,
        pubKey: credential.pubKey,
        email,
        verificationCode
      });

      const me = {
        keyId: user.id as Hex,
        pubKey: user.pubKey,
        account: user.account,
      };

      if (me === undefined) {
        console.log("error while saving user");
        return;
      }
      localStorage.setItem("passkeys4337.me", JSON.stringify(me));
      localStorage.setItem("passkeys4337.returning", "true");
      walletConnect.smartWalletAddress = me.account;
      setIsReturning(true);
      setMe(me);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function get() {
    setIsLoading(true);
    try {
      const credential = await WebAuthn.get();
      if (!credential) {
        return;
      }
      const user = await getUser(credential.rawId);

      if (user?.account === undefined || user?.account === zeroAddress) {
        throw new Error("user not found");
      }

      const me = {
        keyId: user.id as Hex,
        pubKey: user.pubKey,
        account: user.account,
      };

      localStorage.setItem("passkeys4337.me", JSON.stringify(me));
      localStorage.setItem("passkeys4337.returning", "true");
      walletConnect.smartWalletAddress = me.account;
      setIsReturning(true);
      setMe(me);
    } catch (e) {
      localStorage.removeItem("passkeys4337.returning");
      disconnect();
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const genEmail = async (email: string, startTimer: () => void) => {
    setEmail(email);
    //setIsLoading(true);

    try {


      startTimer();

      /** TODO - Fill in fuction
       * Job - Send request to backend,
       * 200 -> move to confirm code page,
       * 400 -> invalid email
       * Connenction refused - will need to handle
       * else -> error has occured
       */
    } catch (e) {

    }
  }

  const clearEmail = async () => {
    setEmail('');
  }

  useEffect(() => {
    const me = localStorage.getItem("passkeys4337.me");
    const returning = localStorage.getItem("passkeys4337.returning");
    if (me) {
      try {
        setMe(JSON.parse(me));
      } catch (e) {
        console.log("error while parsing me");
      }
    }
    if (returning === "true") {
      setIsReturning(true);
    }
    setIsMounted(true);
  }, []);

  return {
    isLoading,
    isMounted,
    me,
    returning: isReturning,
    create,
    get,
    disconnect,
    genEmail,
    clearEmail,
    hasEmail: email.length !== 0,
    storedEmail: email,
    verificationAttemps,
  };
}

type UseMeHook = ReturnType<typeof useMeHook>;
const MeContext = createContext<UseMeHook | null>(null);

export const useMe = (): UseMeHook => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error("useMeHook must be used within a MeProvider");
  }
  return context;
};

export function MeProvider({ children }: { children: React.ReactNode }) {
  const hook = useMeHook();

  return <MeContext.Provider value={hook}>{children}</MeContext.Provider>;
}
