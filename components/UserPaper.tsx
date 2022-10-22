import useSWR from "swr";
import { useLocalStorage } from "usehooks-ts";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export function UserPaper() {
  const [paperToken, setPaperToken] = useLocalStorage<string | boolean>(
    "paper-token",
    false
  );

  const { data, error } = useSWR(
    "/api/user-details?userToken=" + paperToken,
    fetcher
  );

  if (error || !data)
    return {
      email: "",
      walletAddress: "",
    };

  // render data
  return {
    email: data.email as string,
    walletAddress: data.walletAddress as string,
  };
}
