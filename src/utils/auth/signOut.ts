

const authProfileKey = process.env.REACT_APP_AUTH_PROFILE_KEY || "";
const authKey = process.env.REACT_APP_AUTH_KEY || "";
export default function signOut (redirect?: string){
    localStorage.removeItem(authProfileKey);
    localStorage.removeItem(authKey);
    window.location.href = redirect ? `/?redirect=${redirect}` : "/";
}