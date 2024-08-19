import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const { tableId } = req.query;
    const table = await prisma.table.findFirst({
      where: { id: Number(tableId) },
    });
    if (!table) {
      return res.status(400).send("Bad Requests");
    }
    const location = await prisma.location.findFirst({
      where: { id: table?.locationId },
    });
    const company = await prisma.company.findFirst({
      where: { id: location?.companyId },
    });
    let menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: company?.id, isArchived: false },
    });
    const menuCategoryIds = menuCategories.map((item) => item.id);
    const disabledMenuCategoryIds = (
      await prisma.disabledLocationMenuCategory.findMany({
        where: {
          menuCategoryId: { in: menuCategoryIds },
          locationId: location?.id,
        },
      })
    ).map((item) => item.menuCategoryId);

    menuCategories = menuCategories.filter(
      (item) => !disabledMenuCategoryIds.includes(item.id)
    );
    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });
    const menuIds = menuCategoryMenus.map((item) => item.menuId);
    const disabledMenuIds = (
      await prisma.disabledLocationMenu.findMany({
        where: { menuId: { in: menuIds }, locationId: location?.id },
      })
    ).map((item) => item.menuId);
    const menus = (
      await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      })
    ).filter((item) => !disabledMenuIds.includes(item.id));
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menus.map((item) => item.id) } },
    });
    const addonCategoryIds = menuAddonCategories.map(
      (item) => item.addonCategoryId
    );
    const addonCategories = await prisma.addonCategory.findMany({
      where: { id: { in: addonCategoryIds }, isArchived: false },
    });
    const addons = await prisma.addon.findMany({
      where: {
        addonCategoryId: { in: addonCategoryIds },
        isArchived: false,
      },
    });
    return res.status(200).json({
      orders: [],
      company,
      location: [location],
      menuCategories,
      menus,
      menuCategoryMenus,
      menuAddonCategories,
      addonCategories,
      addons,
      tables: [table],
      disabledLocationMenuCategory: [],
      disabledLocationMenu: [],
    });
  }
}
