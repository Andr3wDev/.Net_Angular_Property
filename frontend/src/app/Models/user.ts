/*
export interface UserForRegister {
  fullname: string;
  username: string;
  email: string;
  mobile: number;
  password: string;
  acceptTerms: boolean;
}
export interface UserForLogin {
  username: string;
  password: string;
}
*/

export interface UserForRegister {
  userName: string;
  email?: string;
  password: string;
  mobile?: number;
}

export interface UserForLogin {
  userName: string;
  password: string;
  token: string;
}
