import { LoginWithPaper, PaperSDKProvider } from "@paperxyz/react-client-sdk";
import { NextApiHandler, NextPage } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { Footer } from "../components/Footer";


const Login: NextPage = () => {
  const [value, setValue] = useLocalStorage("paper-token", false);
  const router = useRouter();  

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
    router.push("/");
  };
  // Ensure that you have a PaperSDKProvider set-up with the proper chain name and client Id.
  return (
    <>
      <div className="max-w-sm flex flex-col flex-grow place-content-center items-center">
        <div className="text-center">
          <div className="text-2xl">
            Hi, you are ready to claim you first certificate! 🥳
          </div>
          <div className="text-lg">
            Please 🙏, click the bottom below and register a new account. Only
            your email is required 📧
          </div>
        </div>
        <div className="pt-4"></div>
        <PaperSDKProvider
          clientId={process.env.NEXT_PUBLIC_PAPER_ID}
          chainName="Goerli"
        >
          <LoginWithPaper onSuccess={onSuccessLogin}>
            {({ onClick }: { onClick: () => void }) => {
              return (
                <button className="btn" onClick={onClick}>
                  Login
                </button>
              );
            }}
          </LoginWithPaper>
        </PaperSDKProvider>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
