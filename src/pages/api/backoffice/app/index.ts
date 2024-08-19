import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const { user } = session;
    if (user) {
      const name = user.name as string;
      const email = user.email as string;
      const userFromDb = await prisma.user.findFirst({ where: { email } });
      if (userFromDb) {
        const companyId = userFromDb.companyId;
        const company = await prisma.company.findFirst({
          where: { id: companyId },
        });
        const location = await prisma.location.findMany({
          where: { companyId, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        const locationIds = location.map((para) => para.id);
        const tables = await prisma.table.findMany({
          where: { locationId: { in: locationIds } },
        });
        const menuCategories = await prisma.menuCategory.findMany({
          where: { companyId, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        const menuCategoriesIds = menuCategories.map((param) => param.id);
        const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
          where: { menuCategoryId: { in: menuCategoriesIds } },
        });
        const menuCategoryMenuIds = menuCategoryMenus.map(
          (param) => param.menuId
        );
        const disabledLocationMenuCategory =
          await prisma.disabledLocationMenuCategory.findMany({
            where: { menuCategoryId: { in: menuCategoriesIds } },
          });
        const menus = await prisma.menu.findMany({
          where: { id: { in: menuCategoryMenuIds }, isArchived: false },
          orderBy: [{ id: "asc" }],
        });
        const menuIds = menus.map((param) => param.id);
        const diabledLocationMenu = await prisma.disabledLocationMenu.findMany({
          where: { menuId: { in: menuIds } },
        });
        const menuAddonCategories = await prisma.menuAddonCategory.findMany({
          where: { menuId: { in: menuIds } },
        });

        const addonCategories = await prisma.addonCategory.findMany({
          where: {
            id: {
              in: menuAddonCategories.map((param) => param.addonCategoryId),
            },
            isArchived: false,
          },
          orderBy: [{ id: "asc" }],
        });
        const addons = await prisma.addon.findMany({
          where: {
            addonCategoryId: { in: addonCategories.map((param) => param.id) },
            isArchived: false,
          },
          orderBy: [{ id: "asc" }],
        });
        const orders = await prisma.order.findMany({
          where: { tableId: { in: tables.map((item) => item.id) } },
        });
        return res.status(200).json({
          company,
          location,
          menuCategories,
          menuCategoryMenus,
          menuAddonCategories,
          menus,
          addonCategories,
          addons,
          tables,
          orders,
          diabledLocationMenu,
          disabledLocationMenuCategory,
        });
      } else {
        const newCompany = await prisma.company.create({
          data: {
            name: "Default name",
            street: "Default street",
            township: "Default Township",
            city: "Default City",
          },
        });
        const newUser = await prisma.user.create({
          data: { name, email, companyId: newCompany.id },
        });
        const newLocation = await prisma.location.create({
          data: {
            name: "Default name",
            street: "Default street",
            township: "Default Township",
            city: "Default City",
            companyId: newCompany.id,
          },
        });
        const newMenuCategory = await prisma.menuCategory.create({
          data: {
            name: "Default MenuCategory",
            companyId: newCompany.id,
          },
        });
        const newMenu = await prisma.menu.create({
          data: {
            name: "Default Menu",
            price: 1500,
          },
        });
        const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
          data: {
            menuId: newMenu.id,
            menuCategoryId: newMenuCategory.id,
          },
        });
        const newAddonCategory = await prisma.addonCategory.create({
          data: {
            name: "Default addon category",
          },
        });
        const addonData = [
          { name: "Addon1", addonCategoryId: newAddonCategory.id },
          { name: "Addon2", addonCategoryId: newAddonCategory.id },
          { name: "Addon3", addonCategoryId: newAddonCategory.id },
        ];
        const newAddon = await prisma.$transaction(
          addonData.map((item) => prisma.addon.create({ data: item }))
        );
        const newMenuAddonCategory = await prisma.menuAddonCategory.create({
          data: { menuId: newMenu.id, addonCategoryId: newAddonCategory.id },
        });
        const newTable = await prisma.table.create({
          data: {
            name: "default table",
            locationId: newLocation.id,
            assetUrl: "",
          },
        });
        return res.status(200).json({
          company: newCompany,
          location: [newLocation],
          menuCategories: [newMenuCategory],
          menus: [newMenu],
          diabledLocationMenu: [],
          disabledLocationMenuCategory: [],
          menuCategoryMenus: [newMenuCategoryMenu],
          menuAddonCategory: [newMenuAddonCategory],
          addonCategories: [newAddonCategory],
          addons: [newAddon],
          tables: [newTable],
          orders: [],
        });
      }
    }
  } else {
    return res
      .status(401)
      .send("Unauthorized and you are not redistered in our app");
  }
}

//   if (method === "GET") {
//     return res.status(200).send("Ok get app");
//   } else if (method === "POST") {
//     return res.status(200).send("Ok post app");
//   } else if (method === "PUT") {
//     return res.status(200).send("Ok put app");
//   } else if (method === "DELETE") {
//     return res.status(200).send("Ok delete app");
//   }
//   return res.status(405).send("Invaild method");
