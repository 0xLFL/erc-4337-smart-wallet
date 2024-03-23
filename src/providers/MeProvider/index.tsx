"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Address, Hex, zeroAddress } from "viem";
import { WebAuthn } from "@/libs/web-authn/service/web-authn";
import { saveUser } from "@/libs/factory";
import { getUser } from "@/libs/factory/getUser";
import { walletConnect } from "@/libs/wallet-connect/service/wallet-connect";
import { verifyTormoOtpCode } from "@/app/api/top/verifyTormoOtpCode/route";
import { generateTormoOtpCode } from "@/app/api/top/generateTormoOtpCode/route";
import { checkEmailIsValid } from "@/utils/checkEmailIsValid";

export type Me = {
  account: Address;
  keyId: Hex;
  pubKey: {
    x: Hex;
    y: Hex;
  };
};

const emailErrorMessages = {
  invalid: "*Invalid email",
  taken: "*Email is already in use"
}

function useMeHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState<Me | null>();
  const [isReturning, setIsReturning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMassage] = useState('');
  const [verificationAttemps, setVerificationAttemps] = useState(3);

  function disconnect() {
    localStorage.removeItem("passkeys4337.me");
    setMe(null);
  }

  async function create(
    email: string,
    verificationCodes: Record<number, string>
  ) {
    if (verificationAttemps <= 0) {
      return;
    }

    // sets loading display
    setIsLoading(true);

    try {
      const codesVerified: boolean = await verifyTormoOtpCode(email, verificationCodes);

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
        otp_code: verificationCodes
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

  const genEmail = async (email: string, startTimer: () => void): Promise<void> => {
    setIsLoading(true);
    setEmail(email);

    try {
      if (!checkEmailIsValid(email)) {
        setEmailError(true);
        setEmailErrorMassage(emailErrorMessages.invalid);
      }

      const { success, details } = await generateTormoOtpCode(email);

      if (success) {
        startTimer();

        setIsLoading(false);
      } else {
        setEmailError(true);

        if (details && details.invalid) {
          setEmailErrorMassage(emailErrorMessages.invalid);
        } else if (details && details.taken) {
          setEmailErrorMassage(emailErrorMessages.taken);
        } else {
          setEmailErrorMassage('');

          window.alert('An error has occurred');
        }

        clearEmail();
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
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
