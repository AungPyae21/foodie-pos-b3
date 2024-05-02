import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get menu category");
  } else if (method === "POST") {
    const { name, isAvailable, companyId } = req.body;
    const isValid = name;
    if (!isValid) return res.status(400).send("Some requirments need");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId },
    });
    return res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, locationId, isAvailable, ...payload } = req.body;
    const menuCategory = await prisma.menuCategory.findFirst({ where: { id } });
    if (!menuCategory) {
      return res.status(400).send("Bad Request");
    }
    const updateMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });
    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disabledLocationMenuCategory.create({
          data: { menuCategoryId: id, locationId },
        });
      } else {
        const item = await prisma.disabledLocationMenuCategory.findFirst({
          where: { locationId, menuCategoryId: id },
        });
        item &&
          (await prisma.disabledLocationMenuCategory.delete({
            where: { id: item.id },
          }));
      }
    }
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: location?.companyId },
    });
    const menuCategoryIds = menuCategories.map((item) => item.id);
    const disabledLocationMenuCategory =
      await prisma.disabledLocationMenuCategory.findMany({
        where: { menuCategoryId: { in: menuCategoryIds } },
      });
    return res
      .status(200)
      .json({ updateMenuCategory, disabledLocationMenuCategory });
  } else if (method === "DELETE") {
    const menuCategoryId = Number(req.query.id);
    const exist = await prisma.menuCategory.findFirst({
      where: { id: menuCategoryId },
    });
    if (!exist) return res.status(400).send("Some requirments need");
    await prisma.menuCategory.update({
      data: { isArchived: true },
      where: { id: menuCategoryId },
    });
    return res.status(200).send("Ok delete menu category");
  }
  return res.status(405).send("Invaild method");
}
