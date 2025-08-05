"use client";

import CartItem from "@components/common/CartItemsList";
import { useState } from "react";

export type CartItemType = {
  thumbnail_url: string;
  product_id: string;
  quantity: number;
  price: number;
  name: string;
  id: number;
};

const data = {
  items: [
    {
      thumbnail_url: "https://example.com/img.jpg",
      product_id: "p001",
      name: "fresh",
      price: 95000,
      quantity: 2,
      id: 101,
    },
    {
      thumbnail_url: "https://example.com/img2.jpg",
      product_id: "p002",
      name: "woody",
      price: 65000,
      quantity: 1,
      id: 102,
    },
    {
      thumbnail_url: "https://example.com/img2.jpg",
      product_id: "p002",
      name: "woody",
      price: 65000,
      quantity: 1,
      id: 103,
    },
  ],
  user_id: "abc123",
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(data.items);

  return (
    <div className="mx-auto max-w-[1280px]">
      <p className="text-subtitle-1 py-5">장바구니</p>

      <div className="flex w-full flex-col justify-between">
        <CartItem setCartItems={setCartItems} cartItems={cartItems}></CartItem>
      </div>
    </div>
  );
};

export default Cart;
