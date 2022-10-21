import { LoginWithPaper, PaperSDKProvider } from "@paperxyz/react-client-sdk"
import { useLocalStorage } from 'usehooks-ts'

export function LoginPaper() {

    const [value, setValue] = useLocalStorage('paper-token', false)

    const onSuccessLogin = async (code: string) => {
      // code is the temporary access code that you can swap for a permenant user access token on your backend
      const resp = await fetch("/api/paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
        }),
      });
      if (resp.status !== 200) {
        console.log("resp", resp);
        throw new Error("Failed to get user token");
      }
      const { userToken } = await resp.json();
      setValue(userToken);
    };
    // Ensure that you have a PaperSDKProvider set-up with the proper chain name and client Id.
    return (
      <PaperSDKProvider clientId={process.env.NEXT_PUBLIC_PAPER_ID} chainName="Goerli">
         <LoginWithPaper onSuccess={onSuccessLogin}>{({ onClick } : { onClick : () => void}) => {
        return <button className="btn" onClick={onClick}>Login</button>
    }}</LoginWithPaper>
     </PaperSDKProvider>
    );
  }