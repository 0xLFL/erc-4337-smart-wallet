import { GearIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Text, Button } from "@radix-ui/themes";
import Address from "../Address";
import Link from "next/link";
import LogoAnimated from "../LogoAnimated";
import LogoButton from "../LogoButton";

export default function TopBar() {
  return (
    <Flex width="100%" justify="between" align="center" style={{ position: "relative" }}>
      <Flex gap="2" align={"center"}>
        <Flex gap="2" align={"center"}>
          <LogoButton />
        </Flex>
        <Flex gap="2" align={"center"}>
          <Address style={{ alignSelf: "center" }} />
        </Flex>
      </Flex>

      <Link href={"/settings"}>
        <IconButton variant="soft" size={"3"}>
          <GearIcon />
        </IconButton>
      </Link>
      <Text
        size="1"
        style={{ color: "var(--gray-6)", position: "absolute", top: "2.5rem", left: "1.1rem" }}
      >
        on Sepolia testnet
      </Text>
    </Flex>
  );
}
