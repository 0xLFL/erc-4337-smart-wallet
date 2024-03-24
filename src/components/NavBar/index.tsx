"use client";

import { Button, Flex } from "@radix-ui/themes";
import { useModal } from "@/providers/ModalProvider";
import { PaperPlaneIcon, CornersIcon } from "@radix-ui/react-icons";
import QrReaderModal from "../QrReaderModal";
import SendTxModal from "../SendTxModal";
import QrCode from "../QrCode";

export default function NavBar() {
  const { open } = useModal();

  return (
    <Flex justify="center" direction="column" gap="4" style={{ marginInline: "2 rem", width: "80%" }}>
      <Button
        size="3"
        variant="outline"
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}
        onClick={() => open(<SendTxModal />)}
      >
        {" "}
        Send a transaction
        <PaperPlaneIcon />
      </Button>
      <Button
        size="3"
        variant="outline"
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}
        onClick={() => open(<QrReaderModal />)}
      >
        Connect a dApp
        <CornersIcon style={{ width: 20, height: 20 }} />
      </Button>
      <Button
        size="3"
        variant="outline"
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}
        onClick={() => open(<QrCode />)}
      >
        Get Nft
        <CornersIcon style={{ width: 20, height: 20 }} />
      </Button>
    </Flex>
  );
}
