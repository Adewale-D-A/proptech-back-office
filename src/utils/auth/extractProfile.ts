import Criptic from "../criptic";


const cryptographer = new Criptic();
const authProfileKey = process.env.REACT_APP_AUTH_PROFILE_KEY || "";
export default function extractProfile (){
    const profileCredentials = localStorage.getItem(authProfileKey) || "";
    const decryptProfileCredentials = cryptographer.decrypt(
        authProfileKey,
        profileCredentials
      );
      const profileData = JSON.parse(decryptProfileCredentials);
    return profileData
}