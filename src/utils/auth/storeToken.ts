import Criptic from "../criptic";

const encrypt = new Criptic();
const authKey = process.env.REACT_APP_AUTH_KEY || "";
export default function storeToken ({token}:{token: string}) {
    const strigifiedToken = JSON.stringify({
      token
    });
    // encrypt token
    const encryptedToken = encrypt.encrypt(authKey, strigifiedToken);
    localStorage.setItem(authKey, encryptedToken);
}