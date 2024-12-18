// Assuming you have these types defined for your API
import { forgotPasswordApi, loginApi } from "../constants/api.constant";
import * as opsService from "./Ops";



interface LoginData {
    email: string;
    password?: string ;
}


interface LoginResponse {
    message: string;
    success: boolean;
    status: number;
    data: {
      access_token: string; 
    };
  }
  interface ForgotResponse {
    message: string;
    success: boolean;
    status: number;
    data:  string; 
    
  }

export const logIn = async (data: LoginData): Promise<LoginResponse> => {

    const result = await opsService.postdata<LoginResponse>(loginApi, data);

    return result;
};

export const forgotPassword = async (data: LoginData): Promise<ForgotResponse> => {

  const result = await opsService.postdata<ForgotResponse>(forgotPasswordApi, data);

  return result;
};
