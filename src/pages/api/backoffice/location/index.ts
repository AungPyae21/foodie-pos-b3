import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get location");
  } else if (method === "POST") {
    const { name, companyId, street, township, city } = req.body;
    const isValid = name && companyId && street && township && city;
    if (!isValid) return res.status(400).send("Bad Requests");
    const location = await prisma.location.create({
      data: { name, companyId, street, township, city },
    });
    return res.status(200).json({ location });
  } else if (method === "PUT") {
    const { id, name, street, township, city } = req.body;
    const exist = await prisma.location.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Requests");
    const location = await prisma.location.update({
      data: { name, street, township, city },
      where: { id },
    });
    return res.status(200).json({ location });
  } else if (method === "DELETE") {
    const locationId = Number(req.query.id);
    const exist = await prisma.location.findFirst({
      where: { id: locationId },
    });
    if (!exist) return res.status(400).send("Bad requests");
    await prisma.location.update({
      where: { id: locationId },
      data: { isArchived: true },
    });
    return res.status(200).send("Ok delete location");
  }
  return res.status(405).send("Invaild method");
}
