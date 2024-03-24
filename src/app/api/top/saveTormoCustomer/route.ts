import { backendAddress, dev } from '../../apiConfig.json';
import { Hex } from "viem";

export const saveTormoCustomer = async (
    email_address: string,
    otp_code: Record<number, string>,
    tormo_id: Hex,
    public_key_x: Hex,
    public_key_y: Hex
): Promise<boolean> => {
    const response = await fetch(`${backendAddress}/${process.env.NODE_ENV === dev ? 'test' : 'xyz'}/saveTormoCustomer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address, otp_code: '1239', tormo_id, public_key_x, public_key_y }),
    });

    if (response.status !== 200) {
        return false;
    }
  
    return true;
}