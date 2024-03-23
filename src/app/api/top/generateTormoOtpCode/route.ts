import { backendAddress, dev } from '../../apiConfig.json';

export const generateTormoOtpCode = async (
    email_address: string,
): Promise<{ success: boolean, details: { invalid: boolean, taken: boolean } }> => {
    const response = await fetch(`${backendAddress}/${process.env.NODE_ENV === dev ? 'test' : 'xyz'}/generateTormoOtpCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address }),
    });

    if (response.status !== 200) {
        return { success: false, details: { invalid: false, taken: false } };
    }
  
    const { success, details }:
    { success: boolean, details: { invalid: boolean, taken: boolean } } = await response.json();
  
    return { success, details };
}