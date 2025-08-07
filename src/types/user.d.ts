export interface DeliveryAddress {
  receiver_name?: string;
  address_line1: string;
  address_line2: string;
  phone_number?: string;
  postal_code: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
  id: number;
}

export interface User {
  gender: "FEMALE" | "OTHER" | "MALE";
  phoneNumber: string;
  birthDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  email: string;
  name: string;
  id: number;
}
