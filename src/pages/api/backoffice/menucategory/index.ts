import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get menu category");
  } else if (method === "POST") {
    return res.status(200).send("Ok post menu category");
  } else if (method === "PUT") {
    return res.status(200).send("Ok put menu category");
  } else if (method === "DELETE") {
    return res.status(200).send("Ok delete menu category");
  }
  return res.status(405).send("Invaild method");
}
