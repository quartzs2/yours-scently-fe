// user.mock.ts

import { DeliveryAddress } from "@custom-types/user";
import { User } from "@custom-types/user";

export const mockUser: User = {
  createdAt: "2025-07-01T12:00:00",
  updatedAt: "2025-07-20T15:30:00",
  phoneNumber: "010-1234-5678",
  email: "user@example.com",
  birthDate: "1995-05-15",
  nickname: "향수덕후",
  gender: "MALE",
  isActive: true,
  name: "홍길동",
  id: 1,
};

export const mockAddressData: DeliveryAddress = {
  address_line2: "서울특별시 강남구 역삼동 648-23 여삼빌딩",
  address_line1: "서울특별시 강남구 테헤란로 123",
  created_at: "2025-07-20T10:23:00Z",
  updated_at: "2025-07-22T08:15:00Z",
  phone_number: "010-1234-5678",
  postal_code: "06234",
  receiver_name: "홍길동",
  is_default: true,
  id: 1,
};
