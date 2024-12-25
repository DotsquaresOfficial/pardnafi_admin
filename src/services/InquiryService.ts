import { getContactUsDataApi, searchQueryContactUsApi } from '@/constants/api.constant'
import ApiService from './ApiService'
import { useToken } from '@/store/authStore'
import { GetInquiryListResponse } from '@/views/concepts/inquiry/InquiryList/types';
import * as opsService from "./Ops";



const { token, setToken } = useToken()

const someAsyncTokenFetchFunction = async () => {

    return await token;
};

export async function apiGetContactUsList<T, U extends Record<string, unknown>>(params: U): Promise<GetInquiryListResponse> {
    const tokenPromise = someAsyncTokenFetchFunction();
    if (params.query) {
        return getContactUsByQuery(params.query as string, tokenPromise);
    } else {
        return getContactUsData(tokenPromise);

    }
}


export async function apiGetInquiry<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/inquirys/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetInquiryLog<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/Inquirys/log`,
        method: 'get',
        params,
    })
}

export const getContactUsData = async (tokenPromise: Promise<string | null>): Promise<GetInquiryListResponse> => {

    const token = await tokenPromise;

    const result = await opsService.getData<GetInquiryListResponse>(getContactUsDataApi, token);

    return result;
};
export const getContactUsByQuery = async (query: string, tokenPromise: Promise<string | null>): Promise<GetInquiryListResponse> => {
    const token = await tokenPromise;


    const urlWithQuery = `${searchQueryContactUsApi}?query=${query}`;


    const result = await opsService.getData<GetInquiryListResponse>(urlWithQuery, token);

    return result;
};



