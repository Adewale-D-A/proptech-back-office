import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default async function refreshToken({
  old_token,
}: {
  old_token: string;
}) {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/auth/admin/refresh`,
      headers: { Authorization: `Bearer ${old_token}` },
    });
    const { access_token: new_access_token } = response?.data?.data;
    return { old_token, new_access_token };
  } catch (error) {
    return { old_token, new_access_token: "" };
  }
}
