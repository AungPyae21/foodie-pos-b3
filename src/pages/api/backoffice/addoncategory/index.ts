import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get addon category");
  } else if (method === "POST") {
    const { name, isRequired, menuId } = req.body;
    const isValid = name && isRequired !== undefined && menuId.length;

    if (!isValid) {
      return res.status(400).send("Bad requests and invalid cridentials");
    }
    const newAddonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const menuAddonCategory = await prisma.$transaction(
      menuId.map((item: number) =>
        prisma.menuAddonCategory.create({
          data: { addonCategoryId: newAddonCategory.id, menuId: item },
        })
      )
    );
    return res.status(200).json({ newAddonCategory, menuAddonCategory });
  } else if (method === "PUT") {
    const { name, isRequired, id, menuId } = req.body;
    const exist = await prisma.addonCategory.findFirst({ where: { id } });
    if (!exist) {
      return res.status(400).send("Bad Requests");
    }
    const updateAddonCategory = await prisma.addonCategory.update({
      where: { id: exist.id },
      data: { name, isRequired },
    });
    // shi tar [1,2,3]
    if (menuId.length) {
      const menuAddonCategory = await prisma.menuAddonCategory.findMany({
        where: { addonCategoryId: id },
      });

      const toRemove = menuAddonCategory.filter(
        (item) => !menuId.includes(item.menuId)
      );

      if (toRemove.length) {
        await prisma.menuAddonCategory.deleteMany({
          where: { id: { in: toRemove.map((item) => item.id) } },
        });
        // await prisma.$transaction(
        //   toRemove.map((item) =>
        //     prisma.menuCategoryMenu.delete({
        //       where: { id: item.id },
        //     })
        //   )
        // );
      }
      const toAdd = menuId.filter(
        (item: number) =>
          !menuAddonCategory.find((param) => param.menuId === item)
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((item: number) =>
            prisma.menuAddonCategory.create({
              data: { menuId: item, addonCategoryId: id },
            })
          )
        );
      }
    }
    const menuCategoryMenu = await prisma.menuCategoryMenu.findFirst({
      where: { menuId: menuId[0] },
    });

    const menuCategoryId = menuCategoryMenu?.menuCategoryId;
    const company = await prisma.menuCategory.findFirst({
      where: { id: menuCategoryId },
    });
    const companyId = company?.companyId;
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId },
    });

    const menuCategoryIds = menuCategories.map((item) => item.id);

    const menus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });
    const existingMenuId = menus.map((item) => item?.menuId);
    const menuAddonCategory = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: existingMenuId } },
    });
    return res.status(200).json({ updateAddonCategory, menuAddonCategory });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exist = await prisma.addonCategory.findFirst({ where: { id } });
    if (!exist) {
      return res.status(400).send("Bad Requests");
    }
    await prisma.addonCategory.update({
      where: { id: exist.id },
      data: { isArchived: true },
    });
    return res.status(200).send("Ok delete addon category");
  }
  return res.status(405).send("Invaild method");
}
