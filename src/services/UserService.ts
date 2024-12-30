import { DeleteResponse, GetUsersListResponse, UsersResponse } from '@/views/concepts/users/UserList/types';
import ApiService from './ApiService'
import * as opsService from "./Ops";
import { getAllUsersApi, getUsersByIdApi, updateUserStatusApi, searchQueryUsersApi, updateUsersApi, uploadImageApi } from '@/constants/api.constant';
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



export async function apiGetUsersList<T, U extends Record<string, unknown>>(params: U): Promise<GetUsersListResponse> {
    const tokenPromise = someAsyncTokenFetchFunction();

    if (params.query) {
        return getUsersQuery(params.query as string, tokenPromise);
    } else {

        return getAllUsers(tokenPromise);
    }
}


export async function apiGetUser<T, U extends Record<string, string>>({
    id,
    ...params
}: U) {

    const tokenPromise = someAsyncTokenFetchFunction();
    return getUsersById(id, tokenPromise);

    // return ApiService.fetchDataWithAxios<T>({
    //     url: `/faq/${id}`,
    //     method: 'get',
    //     params,
    // })
}

export async function apiGetUserLog<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/User/log`,
        method: 'get',
        params,
    })
}


export const getAllUsers = async (tokenPromise: Promise<string | null>): Promise<GetUsersListResponse> => {

    const token = await tokenPromise;

    const result = await opsService.getData<GetUsersListResponse>(getAllUsersApi, token);

    return result;
};

export const getUsersQuery = async (query: string, tokenPromise: Promise<string | null>): Promise<GetUsersListResponse> => {
    const token = await tokenPromise;
    const urlWithQuery = `${searchQueryUsersApi}?query=${query}`;
    const result = await opsService.getData<GetUsersListResponse>(urlWithQuery, token);

    return result;
};

export const updateUsers = async (data: {}, tokenPromise: Promise<string | null>): Promise<GetUsersListResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<GetUsersListResponse>(updateUsersApi, data, token);

    return result;
};

export const uploadFile = async (data: {}, tokenPromise: Promise<string | null>): Promise<FileResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<FileResponse>(uploadImageApi, data, token);

    return result;
};



export const getUsersById = async (id: string, tokenPromise: Promise<string | null>): Promise<UsersResponse> => {
    const token = await tokenPromise;
    const urlWithId = `${getUsersByIdApi}?id=${id}`;

    const result = await opsService.getData<UsersResponse>(urlWithId, token);

    return result;
};

export const updateUserStatus = async (data: {}, tokenPromise: Promise<string | null>): Promise<DeleteResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<DeleteResponse>(updateUserStatusApi, data, token);

    return result;
};



