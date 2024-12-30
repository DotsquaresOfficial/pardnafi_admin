import { DeleteResponse, GetKycListResponse, KycResponse } from '@/views/concepts/kyc/KycList/types';
import ApiService from './ApiService'
import * as opsService from "./Ops";
import { getAllKycApi, getKycByIdApi, updateKycStatusApi, searchQueryKycApi, updateKycApi, uploadImageApi } from '@/constants/api.constant';
import { useToken } from '@/store/authStore'

const { token } = useToken()

const someAsyncTokenFetchFunction = async () => {

    return await token;
};

export type FileResponse = {
    file: {
        originalname: string;
        mimetype: string;
        filename: string;
        size: number;
        url: string;
    };
};



export async function apiGetKycList<T, U extends Record<string, unknown>>(params: U): Promise<GetKycListResponse> {
    const tokenPromise = someAsyncTokenFetchFunction();

    if (params.query) {
        return getKycQuery(params.query as string, tokenPromise);
    } else {

        return getAllKyc(tokenPromise);
    }
}


export async function apiGetKyc<T, U extends Record<string, string>>({
    id,
    ...params
}: U) {

    const tokenPromise = someAsyncTokenFetchFunction();
    return getKycById(id, tokenPromise);

    // return ApiService.fetchDataWithAxios<T>({
    //     url: `/faq/${id}`,
    //     method: 'get',
    //     params,
    // })
}




export const getAllKyc = async (tokenPromise: Promise<string | null>): Promise<GetKycListResponse> => {

    const token = await tokenPromise;

    const result = await opsService.getData<GetKycListResponse>(getAllKycApi, token);

    return result;
};

export const getKycQuery = async (query: string, tokenPromise: Promise<string | null>): Promise<GetKycListResponse> => {
    const token = await tokenPromise;
    const urlWithQuery = `${searchQueryKycApi}?query=${query}`;
    const result = await opsService.getData<GetKycListResponse>(urlWithQuery, token);

    return result;
};

export const updateKyc = async (data: {}, tokenPromise: Promise<string | null>): Promise<GetKycListResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<GetKycListResponse>(updateKycApi, data, token);

    return result;
};

export const uploadFile = async (data: {}, tokenPromise: Promise<string | null>): Promise<FileResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<FileResponse>(uploadImageApi, data, token);

    return result;
};



export const getKycById = async (id: string, tokenPromise: Promise<string | null>): Promise<KycResponse> => {
    const token = await tokenPromise;
    const urlWithId = `${getKycByIdApi}?id=${id}`;

    const result = await opsService.getData<KycResponse>(urlWithId, token);

    return result;
};

export const updateKycStatus = async (data: {}, tokenPromise: Promise<string | null>): Promise<DeleteResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<DeleteResponse>(updateKycStatusApi, data, token);

    return result;
};



