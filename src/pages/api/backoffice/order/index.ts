import { prisma } from "@/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get order");
  } else if (method === "POST") {
    return res.status(200).send("Ok post order");
  } else if (method === "PUT") {
    const itemId = String(req.query.itemId);
    const { status } = req.body;

    const isValid = itemId && status;
    if (!isValid) {
      return res.status(400).send("Information not enough");
    }
    const exist = await prisma.order.findFirst({ where: { itemId } });
    if (!exist) {
      return res.status(400).send("Bad Request");
    }
    await prisma.order.updateMany({
      where: { itemId },
      data: { status: status as ORDERSTATUS },
    });
    const tables = await prisma.table.findFirst({
      where: { id: exist.tableId },
    });
    const tableIds = await (
      await prisma.table.findMany({ where: { locationId: tables?.locationId } })
    ).map((item) => item.id);
    const orders = await prisma.order.findMany({
      where: { tableId: { in: tableIds } },
    });
    return res.status(200).json({ orders });
  } else if (method === "DELETE") {
    return res.status(200).send("Ok delete order");
  }
  return res.status(405).send("Invaild method");
}
