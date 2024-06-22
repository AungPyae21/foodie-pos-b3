import { prisma } from "@/utils/prisma";
import { qrCodeUpload } from "@/utils/uploadAsset";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get table");
  } else if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) {
      return res.status(400).send("Bad Requests");
    }
    let newTable = await prisma.table.create({
      data: { name, locationId, assetUrl: "" },
    });
    const assetUrl = await qrCodeUpload(newTable.id);
    newTable = await prisma.table.update({
      where: { id: newTable.id },
      data: { assetUrl },
    });
    return res.status(200).json({ newTable });
  } else if (method === "PUT") {
    return res.status(200).send("Ok put table");
  } else if (method === "DELETE") {
    return res.status(200).send("Ok delete table");
  }
  return res.status(405).send("Invaild method");
}
