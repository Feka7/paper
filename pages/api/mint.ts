import { NextApiRequest, NextApiResponse } from "next";
import { ChainOrRpc, ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404).json({ error: "Method not allowed" });
  }

  try {
    const { receiver, id } = req.query;

    const sdk = ThirdwebSDK.fromPrivateKey(
       process.env.PRIVATE_KEY as string,
       process.env.ALCHEMY_URL as ChainOrRpc,
    );
    const contract = await sdk.getContract(
      "0x8C6026F777fAd0e9F54B6FFBE0fcb2e879142579"
    );
    
    contract.erc1155?.mintAdditionalSupplyTo(
      receiver as string,
      id as string,
      1
    );
    res.status(200).json({ message:  "Mint submitted"});
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
