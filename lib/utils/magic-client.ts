import { Magic } from "magic-sdk";

const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(`${process.env.NEXT_PUBLIC_MAGIC_API_KEY}`)
  );
};
export const m = createMagic();
console.log("magic---------------", typeof m);
