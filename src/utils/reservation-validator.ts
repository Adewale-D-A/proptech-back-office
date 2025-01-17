export default function reservationValidator({ data }: { data: any }) {
  const keyArray = Object.keys(data);
  let response = { message: "Successful validation", success: true };
  for (let index = 0; index < keyArray.length; index++) {
    const element = keyArray[index] as string;
    const value = data[element];
    if (!value) {
      response = { message: `${element} is required`, success: false };
      break;
    }
  }
  return response;
}
