import { UserPaper } from "./UserPaper";
import { useContract } from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import { NFT } from "@thirdweb-dev/sdk";
import { MediaRenderer } from "@thirdweb-dev/react";

type MintingAction = {
  isMinting: boolean | undefined;
  error?: string;
  message?: string;
  collectionFiltered?: NFT[],
  isLoading: boolean;
};

export function Mint() {
  console.log("qui")   
  const { walletAddress } = UserPaper();
  const { contract } = useContract(
    "0x8C6026F777fAd0e9F54B6FFBE0fcb2e879142579",
    "edition"
  );
  const [minting, setMinting] = useState<MintingAction>({
    isMinting: undefined,
    isLoading: false,
  });
  const openModal = useRef<HTMLInputElement>(null);

  const handleMint = async (id: string) => {
    setMinting({
      ...minting,
      isMinting: true,
    });
    openModal.current?.click();
    const res = await fetch(
      "/api/mint?receiver=" + walletAddress + "&id=" + id
    );
    const res_data = await res.json();
    if (!res.ok) {
      setMinting({
        isMinting: false,
        isLoading: false,
        error: "Error: " + res_data?.error,
      });
      return;
    }
    setMinting({
      isMinting: false,
      isLoading: false,
      message: res_data?.message,
    });
  };

  useEffect(() => {
    async function update() {
      setMinting({
        ...minting,
        isLoading: true,
      });
      const nfts = await contract?.getOwned(walletAddress);
      const collection = await contract?.getAll();
      const collection_filtered = collection?.filter(object1 => {
        return !nfts?.some(object2 => {
          return object1.metadata.id === object2.metadata.id;
        })
      });
      setMinting({
        ...minting,
        collectionFiltered: collection_filtered,
        isLoading: false,
      });
    }
    if (minting.isMinting || !walletAddress) return;
    update();
  }, [minting.isMinting, walletAddress]);

  return (
    <>
      <div className="flex flex-col w-full max-w-lg gap-y-4">
        {!minting.isLoading &&
          minting?.collectionFiltered?.map((element) => (
            <div className="flex w-full items-center gap-x-4 bg-slate-100 rounded-xl p-3" key={element.metadata.id}>
              <p className="flex-1">
                Claim the {element.metadata.name} certificate
              </p>
              <MediaRenderer
                src={element.metadata.image}
                width="50"
                height="50"
              />
              <button
                className={`flex-0 btn ${
                  minting.isMinting ? "btn-disabled" : ""
                }`}
                id={element.metadata.id}
                onClick={(e) => handleMint(e.currentTarget.id)}
              >
                Mint
              </button>
            </div>
          ))}
        {minting.isLoading && (
          <progress className="progress w-2/4 progress-primary self-center"></progress>
        )}
      </div>
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
        ref={openModal}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-black">
            Transaction
          </h3>
          {minting.isMinting && <progress className="progress w-2/4 progress-primary self-center"></progress>}
          {!minting.isMinting && <p>{minting?.error} {minting?.message}</p>}
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className={`btn ${minting.isMinting ? "btn-disabled" : ""}`}
              onClick={() => {
                setMinting({
                  ...minting,
                  error: undefined,
                  message: undefined,
                });
              }}
            >
              Ok!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
