"use client";

import { Button, Flex, Callout } from "@radix-ui/themes";
import { useMe } from "@/providers/MeProvider";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import LogoAnimatedLight from "../LogoAnimatedLight";
import { useState } from "react";

export default function History() {
  const { me } = useMe();

  const [minimize, setMinimize] = useState(true);

  const toggleMinimize = () => {
    setMinimize(!minimize);
  }

  if (minimize) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", padding:"0px 10px", position: "relative" }}>
        <Button
          size="2"
          variant="outline"
          style={{
            marginTop: "0.3rem",
            overflow: "hidden",
            width: "min-content",
            padding: "18px",
            aspectRatio: "1 / 1"
          }}
          onClick={toggleMinimize}
        >
          <Callout.Root style={{ marginTop: 0 }}>
            <Callout.Text style={{ fontSize: "1.4em" }}>
              &#94;
            </Callout.Text>
          </Callout.Root>
        </Button>
      </div>
    )
  } else {
    return (
      <Callout.Root style={{ marginTop: 0, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <LogoAnimatedLight style={{ width: "60%", marginBottom: ".5rem" }} />
          <Button
            size="2"
            variant="outline"
            style={{ background: "none", boxShadow:"none", transform: "rotateX(180deg)", marginTop: "-1em" }}
            onClick={toggleMinimize}
          >
            <Callout.Text style={{ fontSize: "1.6em" }}>
              &#94;
            </Callout.Text>
          </Button>
        </div>
        <Callout.Text>
          You smart contract wallet is deployed during the first transaction that you make. You can
          still receive tokens and ETH on your smart contract wallet address in the meantime.
        </Callout.Text>
        <Flex direction="row" gap="1" justify="between">
          <Button
            size="2"
            variant="outline"
            style={{ marginTop: ".3rem" }}
            onClick={() => {
              window.open(`https://sepolia.etherscan.io/address/${me?.account}`, "_blank");
            }}
          >
            Browse history on etherscan
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Callout.Root>
    );
  }
}
