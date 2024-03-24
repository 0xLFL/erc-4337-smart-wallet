import { useMe } from "@/providers/MeProvider";
import { Button, Tooltip } from "@radix-ui/themes";
import { CSSProperties, useState } from "react";
import walletIcon from '../images/wallet.svg';
import NextImage from 'next/image';
import WalletIcon from "../images/WalletIcon/WalletIcon";

type Props = {
  style?: CSSProperties;
};

export default function Address(props: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { me } = useMe();

  const handleCopy = () => {
    navigator.clipboard.writeText(me?.account || "");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  if (!me) {
    return null;
  }

  return (
    <Tooltip content="Copied!" open={isCopied}>
      <Button
        variant="soft"
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...props.style,
          display: "flex",
          justifyContent: "flex-start",
          gap: "6px",
          padding: "12px",
          position: "relative",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "width 1s ease",
          width: isHovered ? "calc(var(--base-button-height) + 13ch)" : "var(--base-button-height)"
        }}
        size={"3"}
      >
        <WalletIcon color={'var(--accent-a11)'} width="20" height="20" />
        <span style={{
            display: "block",
            marginLeft: "1ch"
          }}>
          {me?.account.slice(0, 6)}...{me?.account.slice(-4)}
        </span>
      </Button>
    </Tooltip>
  );
}
