import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404).json({ error: "Method not allowed" });
  }
 
  const userToken = req.query.userToken;

  const resp = await fetch("https://paper.xyz/api/v1/oauth/user-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+process.env.PAPER_KEY,
    },
    body: JSON.stringify({
      userToken: userToken,
      clientId: process.env.NEXT_PUBLIC_PAPER_ID,
    }),
  });
  
  if (resp.status !== 200) {
    return res.status(500).json({ error: "Error getting user token" });
  }
  const data = await resp.json();

  return res.status(200).json(data);
}
