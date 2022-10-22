import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Footer } from "../components/Footer";
import Dashboard from "./dashboard";
import Login from "./login";

const Home: NextPage = () => {
  const router = useRouter()
  const [paperToken, setPaperToken] = useLocalStorage<string | boolean>(
    "paper-token",
    false
  );

  useEffect(() => {
    if (!paperToken) {
      router?.push("/login")
    } else {
      router?.push("/dashboard")
    }
  }, [paperToken]);

  return (
    <>
    <div className="flex flex-grow w-full place-content-center place-items-center">
      <progress className="progress w-1/4 progress-primary"></progress>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
