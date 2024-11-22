import Criptic from "../criptic";


const cryptographer = new Criptic();
const authKey = process.env.REACT_APP_AUTH_KEY || "";
export default function extractToken (){
    const authCredentials = localStorage.getItem(authKey) || "";
    const decryptAuthCredentials = cryptographer.decrypt(
      authKey,
      authCredentials
    );
    const { token } = JSON.parse(decryptAuthCredentials);
    return { token }
}