import { getAllPageApi, pageCreateApi } from '@/constants/api.constant';
import ApiService from './ApiService'
import * as opsService from "./Ops";
import {useToken } from '@/store/authStore'



interface TermsResponse {
    message: string;
    success: boolean;
    status: number;
    total?: number;
    faqs?: any;
    updatedPages: Array<{
      slug: string;
      title?: string;  
      subTitle?: string;
      description?: string;
    }>;
    data?: Array<{
      question: string;
      answer: string;
      _id: string;
    }>;
  }
  

const { token } = useToken()





export async function apiGetTermsLog<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/terms/log`,
        method: 'get',
        params,
    })
}


export const getAllPage = async (tokenPromise: Promise<string | null>): Promise<TermsResponse> => {

    const token = await tokenPromise;

    const result = await opsService.getData<TermsResponse>(getAllPageApi, token);

    return result;
};

export const pageCreate = async (data: {}, tokenPromise: Promise<string | null>): Promise<TermsResponse> => {

    const token = await tokenPromise;

    const result = await opsService.postdata<TermsResponse>(pageCreateApi, data, token);

    return result;
};

















