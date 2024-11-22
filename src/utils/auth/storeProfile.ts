import Criptic from "../criptic";

const cryptographer = new Criptic();
const authProfileKey = process.env.REACT_APP_AUTH_PROFILE_KEY || "";

export default function storeProfile ({profile}:{profile: any}) {
    const strigifiedProfile = JSON.stringify(profile);
    const encryptedProfile = cryptographer.encrypt(
      authProfileKey,
      strigifiedProfile
    );
    localStorage.setItem(authProfileKey, encryptedProfile);
}