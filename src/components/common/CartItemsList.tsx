"use client";

import QuantitySelector from "@components/ui/input/QuantitySelector";
import Checkbox from "@components/ui/input/Checkbox";
import CartCard from "@components/common/CartCard";
import { type CartItemType } from "@app/cart/page";
import Button from "@components/ui/Button";
import { useState, useMemo } from "react";

type CartItemListProps = {
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  cartItems: CartItemType[];
};

/**
 * 장바구니 아이템 목록을 렌더링하는 컴포넌트입니다.
 *
 * 개별 상품에 대한 선택, 수량 변경, 총 가격 계산, 전체 선택 등의 기능을 제공합니다.
 *
 * //예시 데이터 타입
 * export type CartItemType = {
 *   thumbnail_url: string;
 *   product_id: string;
 *   quantity: number;
 *   price: number;
 *   name: string;
 *   id: number;
 * };
 *
 * const [cartItems, setCartItems] = useState<CartItemType[]>(api.items);
 *
 * @example
 * <CartItemList
 *   cartItems={cartItems}
 *   setCartItems={setCartItems}
 * />
 */
const CartItemList = ({ setCartItems, cartItems }: CartItemListProps) => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const allChecked =
    cartItems.length > 0 && checkedIds.size === cartItems.length;
  const selectedOrders = checkedIds.size;
  const SHIPPING_FEE = 3000;

  const handleItemQuantityUpdate = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (allChecked) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(cartItems.map((item) => item.id)));
    }
  };

  const totalPrice = useMemo(() => {
    return cartItems
      .filter((item) => checkedIds.has(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems, checkedIds]);

  const totalShipping = useMemo(() => {
    return cartItems
      .filter((item) => checkedIds.has(item.id))
      .reduce((total, _item) => total + SHIPPING_FEE, 0);
  }, [cartItems, checkedIds]);

  const totalPaymentAmount = totalPrice + totalShipping;

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto py-20 text-center">
        <p className="text-subtitle-1">장바구니에 담긴 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center gap-2 border-b border-text-secondary py-5">
        <Checkbox
          labelClassName="text-button-1 select-none min-w-[75px]"
          label={`전체선택(${selectedOrders})`}
          onChange={toggleSelectAll}
          checked={allChecked}
          type="checkbox1"
          name="selectAll"
          className="m-2"
          id="selectAll"
        />
        <p className="text-button-1 border-l border-text-disabled pl-2 text-text-disabled">
          선택삭제
        </p>
      </div>
      {cartItems.map((item) => (
        <div className="flex w-full flex-wrap justify-between" key={item.id}>
          <CartCard
            isChecked={checkedIds.has(item.id)}
            handleCheckboxChange={toggleCheck}
            name={item.name}
            tags={["안녕"]}
            id={item.id}
            brand="안녕"
          />
          <div className="flex w-[606px] justify-end">
            <div className="text-subtitle-1 flex flex-1 items-center justify-center border-l border-border-default">
              <div className="w-[150px] flex-col items-center justify-center">
                <p className="flex items-center justify-end pb-2">
                  {(item.price * item.quantity).toLocaleString()}
                  <span className="text-subtitle-2">원</span>
                </p>
                <div className="flex justify-end">
                  <QuantitySelector
                    onQuantityChange={(newQuantity) =>
                      handleItemQuantityUpdate(item.id, newQuantity)
                    }
                    initialQuantity={item.quantity}
                    inputClassName="w-8 h-8"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center border-l border-border-default">
              <p className="text-subtitle-2 text-center text-text-primary">
                3,000
                <span className="text-[20px] text-text-secondary">원</span>
                <br />
                <span className="text-text-secondary">배송비</span>
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-2 border-l border-border-default">
              <Button>구매하기</Button>
              <Button theme="light">삭제하기</Button>
            </div>
          </div>
          <div className="my-6 flex h-[50px] w-full flex-none items-center justify-center bg-bg-subtle text-[20px] text-primary-main">
            {(item.price * item.quantity).toLocaleString()}원 + 배송비 3,000원 ={" "}
            {(item.price * item.quantity + SHIPPING_FEE).toLocaleString()}원
          </div>
        </div>
      ))}
      <div className="mx-auto mt-10 flex w-full justify-center border-t border-primary-dark py-11">
        <div className="flex w-[1040px] items-center justify-around">
          <div className="w-[136px] text-center">
            <p className="text-subtitle-2 pb-2 text-text-secondary">
              총 판매가
            </p>
            <p className="text-subtitle-1 flex items-center justify-center text-text-primary">
              {totalPrice.toLocaleString()}
              <span className="text-subtitle-2 text-text-secondary">원</span>
            </p>
          </div>
          <span className="text-subtitle-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-bg-subtle p-6">
            -
          </span>
          <div className="w-[136px] text-center">
            <p className="text-subtitle-2 pb-2 text-text-secondary">
              총 할인금액
            </p>
            <p className="text-subtitle-1 text-system-error">0원</p>
          </div>
          <span className="text-subtitle-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-bg-subtle p-6">
            +
          </span>
          <div className="w-[136px] text-center">
            <p className="text-subtitle-2 flex items-center justify-center pb-2 text-text-secondary">
              배송비
            </p>
            <p className="text-subtitle-1 flex items-center justify-center text-text-primary">
              {totalShipping.toLocaleString()}
              <span className="text-subtitle-2 text-text-secondary">원</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around gap-10 bg-bg-subtle p-9">
        <div className="flex w-full items-center justify-between">
          <p className="text-body-1 text-text-disabled">
            배송비는 할인금액에 따라 변경될 수 있습니다.
          </p>
          <p className="text-subtitle-1">총 결제예상금액</p>
        </div>
        <div className="text-subtitle-1 flex min-w-[138px] items-center justify-end">
          {totalPaymentAmount.toLocaleString()}
          <span className="text-subtitle-2 text-text-primary">원</span>
        </div>
      </div>
      <div className="flex justify-center gap-5 py-15">
        <Button theme={"light"} size={"2xl"}>
          선택주문({selectedOrders})
        </Button>
        <Button size={"2xl"}>전체주문</Button>
      </div>
    </>
  );
};

export default CartItemList;
