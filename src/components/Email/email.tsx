
import { Button, Flex, TextField, Heading, Text } from "@radix-ui/themes";
import LogoAnimated from "../LogoAnimated";

const Email = ({
    createForm,
    email,
    create,
    get,
    isLoading,
    setEmail
}: {
    createForm: boolean,
    email: string,
    create: (email: string) => Promise<void>,
    get: () => Promise<void>,
    isLoading: boolean,
    setEmail: (e: string) => void,
}): JSX.Element => {
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
              email && create(email);
            }

            if (!createForm) {
              e.preventDefault();
              get();
            }
          }}
        >
          {createForm &&
            <Heading size="9">Sign Up</Heading>
          }

          {!createForm &&
            <Heading size="9">Log In</Heading>
          }

          <LogoAnimated
            style={{
              width: "150px",
            }}
          />

          {createForm && (
            <Flex gap={"2"} style={{ width: "85%", flexDirection: "column", alignItems: "center" }}>
              <Text>Please sign up with your email</Text>
              <TextField.Input
                required
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={isLoading}
                size={"3"}
                style={{
                  padding: "0.5rem",
                  width: "30vw"
                }}
              />

              <Button
                style={{ width: "60%", textAlign: "center" }}
                variant={"outline"}
                size={"3"}
                type={"submit"}
              >
                CREATE
              </Button>
            </Flex>
          )}

          {!createForm && (
            <Flex direction='column' align='center' >
              <Text>Please login with your existing passkey</Text>
              <Button style={{ width: "250px" }} variant={"outline"} size={"3"} type={"submit"}>
                LOG IN
              </Button>
            </Flex>
          )}
        </form>
    )
}

export default Email;