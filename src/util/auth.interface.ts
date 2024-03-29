import { Request } from 'express';
import { User } from '@/entities/user.entity'

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface UserRequest extends Request {
  user: User;
}
