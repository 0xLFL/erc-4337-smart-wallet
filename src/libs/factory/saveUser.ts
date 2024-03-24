import { saveTormoCustomer } from "@/app/api/top/saveTormoCustomer/route";
import { Hex } from "viem";
import { User } from "./getUser";

export async function saveUser({
  id,
  pubKey,
  email,
  otp_code
}: {
  id: Hex;
  pubKey: { x: Hex; y: Hex };
  email: string
  otp_code: Record<number, string>
}): Promise<Omit<User, "balance">> {
  if (!pubKey) {
    throw Error('public key is undefined');
  }

  const backendRes = await saveTormoCustomer(email, otp_code, id, pubKey.x, pubKey.y);
  if (!backendRes) {
    throw Error('Unable to save user to details on server');
  }

  console.log(pubKey, id)
  const blockChainResponse = await fetch("/api/users/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, pubKey: [pubKey.x, pubKey.y] }),
  });

  const res: Omit<User, "balance"> = await blockChainResponse.json();

  return res;
}
