import { TextField } from "@radix-ui/themes";

const VerificationCodeInput = ({
  onChange,
  val,
  isLoading
}: {
  onChange: (e: any) => void,
  val: string,
  isLoading: boolean
}) => {
  return (
    <TextField.Input
      required
      value={val}
      onChange={onChange}
      disabled={isLoading}
      size={"3"}
      style={{
        width: "calc(2ch + 2rem)",
        fontSize: "2em",
        textAlign: "center",
        textIndent: "0",
      }}
    />
  )
}

export default VerificationCodeInput