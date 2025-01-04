import CryptoJS from "crypto-js";

export const capitalizeName = (name: string | undefined) => {
  if (name === undefined) return "";
  return name
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string by spaces into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the array back into a string
};

export const encrypt = (str: string) => {
  const encryptedData = CryptoJS.AES.encrypt(
    str,
    import.meta.env.VITE_SECRET
  ).toString();
  return encryptedData;
};

export const decrypt = (str: string | undefined) => {
  if (str === undefined) return;
  const decryptedData = CryptoJS.AES.decrypt(str, import.meta.env.VITE_SECRET);
  const originalText = decryptedData.toString(CryptoJS.enc.Utf8);
  return originalText;
};
