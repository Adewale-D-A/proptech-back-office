export default function assignRoleId (userType: string) {
  try {
    return userType?.toLowerCase() ==="farmer" ? {id: 2001, meta: {
      url: "/home"
    }} : userType?.toLowerCase() ==="admin" ? {id: 5001, meta: {
      url: "/admin"
    }}: userType?.toLowerCase() ==="anonymous" ? {id: 1001, meta: {
      url: "/crop-information"
    }} : {id: 3001, meta: {
      url: "/chat"
    }};
  } catch (error) {
    return {id: 1001, meta: {
      url: "/crop-information"
    }};
  }
};