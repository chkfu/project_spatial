import type { RowDataPacket } from 'mysql2';


export interface IUser extends RowDataPacket {
  id: number;
  name: string,
  gender: string | null;
  age: number | null;
  email: string;
  password: string;
  passwordConfirm: string;
  creatdAt: Date;
  updatedAt: Date | null;
}
