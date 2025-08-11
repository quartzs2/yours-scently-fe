export type User = {
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
};

export type DeliveryAddress = {
  receiverName?: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
  id: number;
};
