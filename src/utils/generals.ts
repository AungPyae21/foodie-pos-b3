import { CartItem } from "@/types/cart";

export const getCartTotalPrice = (cartItems: CartItem[]) => {
  const totalPrice = cartItems.reduce((accu, item) => {
    const menuPrice = item.menu.price;
    const totalAddonPrice = item.addons.reduce(
      (addonPrice, addon) => (addonPrice += addon.price),
      0
    );
    accu += (menuPrice + totalAddonPrice) * item.quantity;
    return accu;
  }, 0);
  return totalPrice;
};
