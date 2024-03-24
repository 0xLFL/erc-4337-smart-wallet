"use client";

import { Chain, EstimateFeesPerGasReturnType, Hash, Hex, parseEther } from "viem";
import { smartWallet } from "@/libs/smart-wallet";
import { useEffect, useRef, useState } from "react";
import { Flex, Link, Button, Heading, Text, TextField, Callout } from "@radix-ui/themes";
import { UserOpBuilder, emptyHex } from "@/libs/smart-wallet/service/userOps";
import { useBalance } from "@/providers/BalanceProvider";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExternalLinkIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { useMe } from "@/providers/MeProvider";
import Spinner from "../Spinner";
import { MAINNET_PUBLIC_CLIENT } from "@/constants";
import { normalize } from "viem/ens";

smartWallet.init();
const builder = new UserOpBuilder(smartWallet.client.chain as Chain);

export default function QrCode() {
  const [qrCode, setQrCode] = useState('');

  return (
    <Flex direction="column" align='center' style={{ flexGrow: 1, width: "100%" }} gap="5">
      <Heading as="h2" size={"8"} style={{ color: "var(--accent-9)" }}>
        Get Your NFT
      </Heading>
      <Text>
        Scan the QR Code to get your NFT
      </Text>
      <img
        src={qrCode}
        style={{
          width: "80%",
          aspectRatio: "1 / 1",
          border: "5px solid var(--accent-8)",
          borderRadius: "10%"
        }}
      />
    </Flex>
  );
}
