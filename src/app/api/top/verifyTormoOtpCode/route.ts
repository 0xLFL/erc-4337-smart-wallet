import { backendAddress, dev } from '../../apiConfig.json';

export const verifyTormoOtpCode = async (
    email_address: string,
    otp_code: Record<number, string>
): Promise<boolean> => {
    const response = await fetch(`${backendAddress}/${process.env.NODE_ENV === dev ? 'test' : 'xyz'}/verifyTormoOtpCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            otp_code: '1239'
        },
        body: JSON.stringify({ email_address }),
    });

    if (response.status !== 200) {
        return false;
    }
  
    const { success }: { success: boolean } = await response.json();
  
    return success;
}
  