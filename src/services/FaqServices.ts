import { faqApi, faqCreateApi, getFaqByIdApi, updateFaqApi, searchQueryFaqApi,removeFaqApi } from '@/constants/api.constant';
import ApiService from './ApiService'
import * as opsService from "./Ops";
import { useSessionUser, useToken } from '@/store/authStore'
import { string } from 'zod';
import { GetFaqListResponse } from '@/views/concepts/faq/FaqList/types';


interface FaqResponse {
    message: string;
    success: boolean;
    status: number;
    total?: number;
    faqs?: any;
    data?: {
        question: string;
        answer: string;
        _id: string;
      }
      
    
  }

  
  

const { token, setToken } = useToken()

const someAsyncTokenFetchFunction = async () => {

    return await token;
};


export async function apiGetFaqList<T, U extends Record<string, unknown>>(params: U): Promise<GetFaqListResponse> {
    const tokenPromise = someAsyncTokenFetchFunction();
  
    if (params.query) {
        return getFaqByQuery(params.query as string, tokenPromise);
    } else {

        return getFaq(tokenPromise);
    }
}

export async function apiGetFaq<T, U extends Record<string, string>>({
    id,
    ...params
}: U) {
    const tokenPromise = someAsyncTokenFetchFunction();
    return getFaqById(id, tokenPromise);

    // return ApiService.fetchDataWithAxios<T>({
    //     url: `/faq/${id}`,
    //     method: 'get',
    //     params,
    // })
}

export async function apiGetFaqLog<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/faq/log`,
        method: 'get',
        params,
    })
}


export const getFaq = async (tokenPromise: Promise<string | null>): Promise<GetFaqListResponse> => {

    const token = await tokenPromise;

    const result = await opsService.getData<GetFaqListResponse>(faqApi, token);

    return result;
};

export const faqCreate = async (data: {}, tokenPromise: Promise<string | null>): Promise<FaqResponse> => {

    const token = await tokenPromise;

    const result = await opsService.postdata<FaqResponse>(faqCreateApi, data, token);

    return result;
};


export const getFaqById = async (id: string, tokenPromise: Promise<string | null>): Promise<FaqResponse> => {
    const token = await tokenPromise;


    const urlWithId = `${getFaqByIdApi}?id=${id}`;


    const result = await opsService.getData<FaqResponse>(urlWithId, token);

    return result;
};

export const faqUpdate = async (data: {}, tokenPromise: Promise<string | null>): Promise<FaqResponse> => {


    const token = await tokenPromise;

    const result = await opsService.postdata<FaqResponse>(updateFaqApi, data, token);

    return result;
};

export const getFaqByQuery = async (query: string, tokenPromise: Promise<string | null>): Promise<GetFaqListResponse> => {
    const token = await tokenPromise;


    const urlWithQuery = `${searchQueryFaqApi}?query=${query}`;


    const result = await opsService.getData<GetFaqListResponse>(urlWithQuery, token);

    return result;
};

export const removeFaq = async (data: {}, tokenPromise: Promise<string | null>): Promise<FaqResponse> => {
    const token = await tokenPromise;



    const result = await opsService.postdata<FaqResponse>(removeFaqApi,data, token);

    return result;
};















