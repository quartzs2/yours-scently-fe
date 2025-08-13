import { DeliveryAddress } from "@custom-types/user";
import { User } from "@custom-types/user";

export const mockUserApi: User = {
  createdAt: "2025-07-01T12:00:00",
  updatedAt: "2025-08-01T09:00:00",
  phoneNumber: "010-1234-5678",
  email: "cently@gmail.com",
  birthDate: "1990-09-09",
  nickname: "cently",
  gender: "MALE",
  isActive: true,
  name: "유아스",
  id: 1001,
};

export const mockAddresses: DeliveryAddress[] = [
  {
    addressLine1: "경기도 고양시 덕양구 호국로 89", // 도로명
    createdAt: "2025-07-01T12:00:00",
    updatedAt: "2025-08-01T09:00:00",
    addressLine2: "경기도 고양시 도래움", // 지번
    receiverName: "유아스",
    postalCode: "10400",
    isDefault: true,
    id: 1,
  },
  {
    addressLine1: "서울특별시 마포구 월드컵북로 400",
    addressLine2: "서울특별시 마포구 상암동",
    receiverName: "유아스",
    postalCode: "03925",
    isDefault: false,
    id: 2,
  },
];
