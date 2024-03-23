"use client";

import { createContext, useContext, useState } from "react";

function useNftHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState({});

  const getNftDetails = () => {

  }

  return {
    isLoading,
    nfts,
    getNftDetails
  }
}

type UseMeHook = ReturnType<typeof useNftHook>;
const NftContext = createContext<UseMeHook | null>(null);

export const useNft = (): UseMeHook => {
  const context = useContext(NftContext);
  if (!context) {
    throw new Error("useNftHook must be used within a NftProvider");
  }
  return context;
};

export function NftProvider({ children }: { children: React.ReactNode }) {
  const hook = useNftHook();

  return <NftContext.Provider value={hook}>{children}</NftContext.Provider>;
}
