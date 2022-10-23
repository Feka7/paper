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
  const [paperToken, setPaperToken] = useLocalStorage<string>(
    "paper-token",
    ""
  );

  const { data, error } = useSWR(paperToken ?
    "/api/user-details?userToken=" + paperToken : null,
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
