import React from 'react';
import { Flex, Callout } from "@radix-ui/themes";
import { useNft } from '@/providers/NftProvider';

const NftDisplay = (): JSX.Element => {
  const {
    isLoading,
    nfts,
    getNftDetails
  } = useNft();

  return (
    <Flex direction="column" width="100%">
      <Flex
        direction="column"
        align="center"
        width="100%"
        style={{
          borderBottom: "1px solid var(--orange-8)",
          padding: "10px 0",
          margin: "5px 0",
        }}>
        <Callout.Text style={{ fontSize: "1.4em", color: "var(--orange-11)" }}>
          Your NFTs
        </Callout.Text>
      </Flex>
    </Flex>
  )
}

export default NftDisplay;