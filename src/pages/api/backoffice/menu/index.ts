import { prisma } from "@/utils/prisma";
import { MenuCategory } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Ok get menu");
  } else if (method === "POST") {
    const { name, price, menuCategoryIds } = req.body;
    // return res.send("popo");
    const isValid = name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Some requirments need");
    const menu = await prisma.menu.create({ data: { name, price } });
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: itemId },
        })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenus });
  } else if (method === "PUT") {
    const { id, name, price, menuCategoryIds, locationId, isAvaliable } =
      req.body;
    const exist = await prisma.menu.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");
    const updateMenu = await prisma.menu.update({
      data: { name, price },
      where: { id: exist.id },
    });

    if (menuCategoryIds.length) {
      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuId: id },
      });

      const toRemove = menuCategoryMenus.filter(
        (item) => !menuCategoryIds.includes(item.menuCategoryId)
      );

      if (toRemove.length) {
        await prisma.menuCategoryMenu.deleteMany({
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
      const toAdd = menuCategoryIds.filter(
        (item: number) =>
          !menuCategoryMenus.find((param) => param.menuCategoryId == item)
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((item: number) =>
            prisma.menuCategoryMenu.create({
              data: {
                menuId: id,
                menuCategoryId: item,
              },
            })
          )
        );
      }
    }
    if (locationId && isAvaliable !== undefined) {
      if (isAvaliable === false) {
        await prisma.disabledLocationMenu.create({
          data: { menuId: id, locationId },
        });
      } else {
        const item = await prisma.disabledLocationMenu.findFirst({
          where: { locationId, menuId: id },
        });
        item &&
          (await prisma.disabledLocationMenu.delete({
            where: { id: item.id },
          }));
      }
    }
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    const locations = await prisma.location.findMany({
      where: { companyId: location?.id },
    });
    const locationIds = locations.map((item) => item.id);
    const disabledLocationMenu = await prisma.disabledLocationMenu.findMany({
      where: { locationId: { in: locationIds } },
    });

    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuId: id },
    });

    return res
      .status(200)
      .json({ updateMenu, disabledLocationMenu, menuCategoryMenus });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);
    const exist = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!exist) return res.status(400).send("Bad Request");
    await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    return res.status(200).send("Ok delete menu");
  }
  return res.status(405).send("Invaild method");
}
