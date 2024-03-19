import { useMe } from "@/providers/MeProvider";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Flex, Link, IconButton } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import ThemeButton from "../ThemeButton";
import Spinner from "../Spinner";
import Email from "../Email/email";
import VerificationCode from "../VerificationCode.tsx/verificationCode";

export default function OnBoarding() {
  const numOfCodes = 4;
  const resendTimerInit = 30;

  const [email, setEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [verificationCode, setVerificationCode]= useState(() => {
    const codes: Record<number, string> = {}
    for (let i = 1; i <= numOfCodes; i++) {
      codes[i] = '';
    }

    return codes;
  })
  const {
    genEmail,
    create,
    get,
    returning,
    isLoading,
    hasEmail,
    storedEmail,
    clearEmail,
  } = useMe();
  const [createForm, setCreateForm] = useState(!returning);

  const startTimer = async () => {
    setResendTimer(resendTimerInit)
  }

  const setCode = (key: number, val: string) => {
    const numRegex = /^\d{0,2}$/;
    console.log(val, key, key >= 1, key <= numOfCodes, numRegex.test(val))
    if (key >= 1 && key <= numOfCodes && numRegex.test(val)) {
      console.log(val)
      setVerificationCode(prevState => ({
        ...prevState,
        [key]: val
      }));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(prevResendTimer => prevResendTimer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [resendTimer]);

  return (
    <Flex
      align="center"
      justify={"between"}
      direction="column"
      style={{ position: "relative", width: "100%", gap: "2rem" }}
    >
      <Flex justify={"between"} align={"baseline"} width={"100%"}>
        <IconButton
          onClick={() => window.open("https://github.com/passkeys-4337/smart-wallet", "_blank")}
          variant="soft"
          size={"3"}
        >
          <GitHubLogoIcon />
        </IconButton>

        <ThemeButton />
      </Flex>

      {isLoading && <Spinner />}

      {!isLoading && !hasEmail &&
        <Email
          createForm={createForm}
          email={email}
          create={async (email: string) => { await genEmail(email, startTimer) }}
          get={get}
          isLoading={isLoading}
          setEmail={(email: string) => { setEmail(email) }}
        />
      }

      {!isLoading && hasEmail &&
        <VerificationCode
          verificationCode={verificationCode}
          setCode={setCode}
          create={create}
          email={storedEmail}
          isLoading={isLoading}
          createForm={createForm}
          get={get}
          numOfCodes={numOfCodes}
          genEmail={() => { genEmail(storedEmail, startTimer) }}
          clearEmail={clearEmail}
          resendTimer={resendTimer}
        />
      }

      <Flex style={{ width: "100%", whiteSpace: "nowrap" }} justify={"end"}>
        {!createForm && !isLoading && !hasEmail && (
          <Link
            onClick={() => {
              !isLoading && setCreateForm(true);
            }}
            size={"2"}
          >
            or create a new wallet
          </Link>
        )}

        {createForm && !isLoading && !hasEmail && (
          <Link onClick={() => !isLoading && setCreateForm(false)} size={"2"}>
            or log in with an existing passkey
          </Link>
        )}
      </Flex>
    </Flex>
  );
}
