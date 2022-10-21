import { useLocalStorage } from "usehooks-ts";
import { UserPaper } from "./UserPaper";
import { Footer } from "../components/Footer";
import { Mint } from "./Mint";
import { useState } from "react";
import { Certificates } from "./Certificates";

export function MenuUser() {
  const [paperToken, setPaperToken] = useLocalStorage<string | boolean>(
    "paper-token",
    false
  );

  const { email } = UserPaper();
  const  [pageMint, setPageMint] = useState<Boolean>(true)

  // Ensure that you have a PaperSDKProvider set-up with the proper chain name and client Id.RTIFICATES
  return (
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col place-items-center">
          <div className="max-w-3xl navbar sm:mt-[10rem] bg-primary text-primary-content text-lg sm:rounded-lg">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 hidden lg:block">
            <ul className="menu menu-horizontal">
                <li>
                <a onClick={() => setPageMint(true)} className={`${pageMint ? "underline" : ""}`}>CLAIM</a>
                </li>
                <li>
                <a onClick={() => setPageMint(false)} className={`${pageMint ? "" : "underline"}`}>CERTIFICATES</a>
                </li>
              </ul>
            </div>
            <div className="flex-1 px-2 mx-2 justify-end gap-x-4">
              <p className="hidden sm:block">{email}</p>
              <ul className="menu menu-horizontal">
                <li>
              <a href="https://paper.xyz/wallet" target="__blank">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              </a>
              </li>
              <li>
              <button onClick={() => setPaperToken(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              </button>
              </li>
              </ul>
            </div>
          </div>
          <div className="grid grow w-full place-items-center">
            {pageMint && <Mint/>}
            {!pageMint && <Certificates/>}
          </div>
        <Footer/>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-gray-200">
            <li>
              <a onClick={() => setPageMint(true)} className={`${pageMint ? "underline" : ""}`}>CLAIM</a>
            </li>
            <li>
              <a onClick={() => setPageMint(false)} className={`${pageMint ? "" : "underline"}`}>CERTIFICATES</a>
            </li>
          </ul>
        </div>
      </div>
  );
}
