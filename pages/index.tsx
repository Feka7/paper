import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";

const Home: NextPage = () => {
  const router = useRouter()
  const [paperToken, setPaper] = useLocalStorage<string>("paper-token", "");

  useEffect(() => {
    if (!paperToken) {
      router?.push("/login")
    } else {
      router?.push("/dashboard")
    }
  }, [paperToken]);

  return (
    <>
    <Loading/>
    <Footer/>
    </>
  );
};

export default Home;
