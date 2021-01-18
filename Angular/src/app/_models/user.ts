import { V4Options as UUID } from 'uuid';

export interface User {
  id?: UUID;
  name: string;
  email: string;
  password: string;
  address: string;
  postalCode: string;
  phoneNumber: number;
  role: string;
}
