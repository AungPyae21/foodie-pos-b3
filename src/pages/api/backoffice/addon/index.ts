import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get addon");
  } else if (method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && price && addonCategoryId;
    if (!isValid) {
      return res.status(400).send("Bad Requests");
    }
    const newAddon = await prisma.addon.create({
      data: { name, price, addonCategoryId },
    });
    return res.status(200).json({ newAddon });
  } else if (method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;
    const exist = await prisma.addon.findFirst({ where: { id } });
    if (!exist) {
      return res.status(400).send("Bad Requests");
    }
    const updateAddon = await prisma.addon.update({
      data: { name, price, addonCategoryId },
      where: { id: exist.id },
    });
    return res.status(200).json({ updateAddon });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exist = await prisma.addon.findFirst({ where: { id } });
    if (!exist) {
      return res.status(400).send("Bad Requests");
    }
    await prisma.addon.update({
      where: { id: exist.id },
      data: { isArchived: true },
    });
    return res.status(200).send("Ok delete addon");
  }
  return res.status(405).send("Invaild method");
}
