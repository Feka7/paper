import { UserPaper } from "./UserPaper";
import { useContract } from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import { NFT } from "@thirdweb-dev/sdk";
import { MediaRenderer } from "@thirdweb-dev/react";

type LoadingAction = {
  collection?: NFT[],
  isLoading: boolean;
};

export function Certificates() {
  const { walletAddress } = UserPaper();
  const { contract } = useContract(
    "0x8C6026F777fAd0e9F54B6FFBE0fcb2e879142579",
    "edition"
  );
  const [loading, setLoading] = useState<LoadingAction>({
    isLoading: false,
  });

  useEffect(() => {
    async function update() {
      setLoading({
        ...loading,
        isLoading: true,
      });
      const nfts = await contract?.getOwned(walletAddress);
      setLoading({
        collection: nfts,
        isLoading: false,
      });
    }
    update();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full max-w-lg gap-y-4">
        {!loading.isLoading &&
          loading?.collection?.map((element) => (
            <div className="flex w-full items-center gap-x-4 bg-slate-100 rounded-xl p-3" key={element.metadata.id}>
              <p className="flex-1">
                {element.metadata.name} certificate
              </p>
              <MediaRenderer
                src={element.metadata.image}
                width="50"
                height="50"
              />
              <a className="btn" href={"https://testnets.opensea.io/assets/goerli/"+contract?.getAddress()+"/"+element.metadata.id}
              >
                View on Opensea
              </a>
            </div>
          ))}
        {loading.isLoading && (
          <progress className="progress w-2/4 progress-primary self-center"></progress>
        )}
      </div>
    </>
  );
}
