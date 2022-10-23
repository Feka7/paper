import { LoginWithPaper, PaperSDKProvider } from "@paperxyz/react-client-sdk";
import { NextApiHandler, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";

type LoginAction = {
  isLogging: boolean;
  error: string;
};

const Login: NextPage = () => {
  const [value, setValue] = useLocalStorage("paper-token", false);
  const [login, setLogin] = useState<LoginAction>({
    isLogging: false,
    error: "",
  });
  const router = useRouter();

  const onSuccessLogin = async (code: string) => {
    setLogin({
      isLogging: true,
      error: "",
    });
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
      setLogin({
        isLogging: false,
        error: "Failed to login. Try again",
      });
    }
    const { userToken } = await resp.json();
    setValue(userToken);
    router.push("/");
  };

  if(login.isLogging) return (
    <>
        <Loading/>
        <Footer/>
    </>
  )


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
          {login.error &&
            <div className="alert alert-error shadow-lg mt-5">
              {login.error}
              <div className="flex-none">
              <button onClick={() => setLogin({ ...login, error: ""})}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              </button>
              </div>
            </div>
          }
        </PaperSDKProvider>
      </div>
      <Footer />
    </>
  );
};

export default Login;
