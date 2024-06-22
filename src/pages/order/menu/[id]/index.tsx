import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/CartSlice";
import { CartItem } from "@/types/cart";
import { Box, Button } from "@mui/material";
import { Addon } from "@prisma/client";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetail = () => {
  const { query, isReady, ...router } = useRouter();
  const menus = useAppSelector((state) => state.menu.menus);
  const cartItems = useAppSelector((state) => state.cart.items);
  const menuId = Number(query.id);
  const cartItemId = query.cartItemId;
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  const menu = menus.find((item) => item.id === menuId);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const allMenuAddonCategories = useAppSelector(
    (state) => state.menuAddonCategory.menuAddonCategories
  );
  const addonCategoryIds = allMenuAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);
  const addonCategories = useAppSelector(
    (state) => state.addonCategory.addonCategories
  ).filter((item) => addonCategoryIds.includes(item.id));
  const dispatch = useAppDispatch();

  //for button disabled or not
  useEffect(() => {
    const requiredAddonCategories = addonCategories.filter(
      (item) => item.isRequired
    );
    const selectedRequiredAddons = selectedAddons.filter((selectedAddon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === selectedAddon.addonCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });
    const isDisabled =
      requiredAddonCategories.length !== selectedRequiredAddons.length;
    setIsDisabled(isDisabled);
  }, [selectedAddons, addonCategories]);

  useEffect(() => {
    if (cartItem) {
      const { addons, quantity } = cartItem;
      setSelectedAddons(addons);
      setQuantity(quantity);
    }
  }, [cartItem]);

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  const handleAddToCart = () => {
    if (!menu) return;
    const newCartItem: CartItem = {
      id: cartItem ? cartItem.id : nanoid(7),
      menu,
      addons: selectedAddons,
      quantity,
    };
    dispatch(addToCart(newCartItem));
    const pathname = cartItem ? "/order/cart" : "/order";
    router.push({ pathname, query });
  };

  if (!isReady || !menu) return null;

  return (
    <Box
      sx={{
        position: "relative",
        px: 2,
        top: { xs: 10, md: -170, lg: -250, xl: -400 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          // menu.assetUrl ||
          src={"/default-menu.png"}
          alt="menu-image"
          width={150}
          height={150}
          style={{
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", sm: 350 },
            mt: 30,
            boxSizing: "border-box",
          }}
        >
          <AddonCategories
            addonCategories={addonCategories}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
          />
          <QuantitySelector
            value={quantity}
            onDecrease={handleQuantityDecrease}
            onIncrease={handleQuantityIncrease}
          />
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={handleAddToCart}
            sx={{
              width: "fit-content",
              mt: 2,
            }}
          >
            {cartItem ? "Update cart" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuDetail;
