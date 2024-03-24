import { Button, Text, Flex, Link } from "@radix-ui/themes";
import LogoAnimated from "../LogoAnimated";
import VerificationCodeInput from "./verificationCodeInput";

const VerificationCode = ({
  verificationCode,
  setCode,
  create,
  email,
  isLoading,
  createForm,
  get,
  numOfCodes,
  clearEmail,
  genEmail,
  resendTimer
}: {
  verificationCode: Record<number, string>,
  setCode: (key: number, val: string) => void,
  create: (email: string, verificationCode: Record<number, string>) => Promise<void>,
  email: string,
  isLoading: boolean,
  createForm: boolean,
  get: () => Promise<void>
  numOfCodes: number,
  genEmail: () => void,
  clearEmail: () => void,
  resendTimer: number
}): JSX.Element => {
  const createInputFeilds = (numOfFeilds: number) => {
    const inputs: JSX.Element[] = [];
    for (let i = 1; i <= numOfFeilds; i++) {
      const key = i;
      inputs.push(<VerificationCodeInput
        key={key}
        onChange={(e: any) => { setCode(key, e.target.value) }}
        val={verificationCode[key]}
        isLoading={isLoading}
      />)
    }

    return inputs;
  }

  return (
    <form
      style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center",
    }}
    onSubmit={(e) => {
      if (createForm) {
        e.preventDefault();
        email && verificationCode && create(email, verificationCode);
      }

      if (!createForm) {
        e.preventDefault();
        get();
      }
    }}>
      <LogoAnimated
        style={{
          width: "150px",
        }}
      />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Text
          style={{
            color: "var(--accent-a11)",
            fontFamily: "inherit"
          }}
        >Please enter the Verification code that</Text>
        <Text
          style={{
            color: "var(--accent-a11)",
            fontFamily: "inherit"
          }}
        >has been sent to</Text>
        <Text
          style={{
            color: "var(--accent-a11)",
            fontFamily: "inherit"
          }}
        >{email}</Text>
      </div>
      <div style={{ display:"flex", width: "85%", justifyContent: "space-between" }}>
        {
          createInputFeilds(numOfCodes)
        }
      </div>

      <Flex style={{ width: "100%", whiteSpace: "nowrap" }} justify={"center"}>
        <Link
          onClick={() => {
            !isLoading && resendTimer <= 0 && genEmail();
          }}
          size={"2"}
        >
          Resend Code {resendTimer > 0 ? `(${resendTimer})` : ''}
        </Link>
      </Flex>

      <Button
        style={{ width: "60%", textAlign: "center" }}
        variant={"outline"}
        size={"3"}
        type={"submit"}
      >
        Verify Email
      </Button>
      <Flex style={{ width: "100%", whiteSpace: "nowrap" }} justify={"center"}>
        <Link
          onClick={() => {
            !isLoading && clearEmail();
          }}
          size={"2"}
        >
          or Edit Email
        </Link>
      </Flex>
    </form>
  )
}

export default VerificationCode;
