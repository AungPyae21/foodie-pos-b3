import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get menu");
  } else if (method === "POST") {
    return res.status(200).send("Ok post menu");
  } else if (method === "PUT") {
    return res.status(200).send("Ok put menu");
  } else if (method === "DELETE") {
    return res.status(200).send("Ok delete menu");
  }
  return res.status(405).send("Invaild method");
}
