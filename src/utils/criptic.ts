export default class Criptic {
  encrypt(salt: string, text: string) {
    try {
      const textToChars = (text: string) =>
        text.split("").map((c) => c.charCodeAt(0));
      const byteHex = (n: string) => ("0" + Number(n).toString(16)).substr(-2);
      const applySaltToChar = (code: any) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);

      return text
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
    } catch (error) {
      return "";
    }
  }
  decrypt(salt: string, encoded: any) {
    try {
      const textToChars = (text: string) =>
        text.split("").map((c) => c.charCodeAt(0));
      const applySaltToChar = (code: number) =>
        textToChars(salt).reduce((a, b) => a ^ b, code);
      return encoded
        .match(/.{1,2}/g)
        .map((hex: string) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode: number) => String.fromCharCode(charCode))
        .join("");
    } catch (error) {
      return "{}";
    }
  }
}
