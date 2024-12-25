import { DeleteResponse } from '@/views/concepts/users/UserList/types';

import ApiService from './ApiService'
import * as opsService from "./Ops";
import { getAllGroupApi, searchQueryGroupApi, groupCreateApi, updateGroupApi, uploadImageApi, getGroupByIdApi } from '@/constants/api.constant';
import { useToken } from '@/store/authStore'
import { GroupResponse, GetGroupListResponse } from '@/views/concepts/group/GroupList/types';

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



export async function apiGetGroupList<T, U extends Record<string, unknown>>(params: U): Promise<GetGroupListResponse> {
    const tokenPromise = someAsyncTokenFetchFunction();

    if (params.query) {
        return getGroupQuery(params.query as string, tokenPromise);
    } else {

        return getAllGroup(tokenPromise);
    }
}


export async function apiGetGroup<T, U extends Record<string, string>>({
    id,
    ...params
}: U) {

    const tokenPromise = someAsyncTokenFetchFunction();
    console.log(id,"hhhhh")
    return getGroupsById(id, tokenPromise);

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


export const getAllGroup = async (tokenPromise: Promise<string | null>): Promise<GetGroupListResponse> => {

    const token = await tokenPromise;

    const result = await opsService.getData<GetGroupListResponse>(getAllGroupApi, token);

    return result;
};

export const getGroupQuery = async (query: string, tokenPromise: Promise<string | null>): Promise<GetGroupListResponse> => {
    const token = await tokenPromise;
    const urlWithQuery = `${searchQueryGroupApi}?query=${query}`;
    const result = await opsService.getData<GetGroupListResponse>(urlWithQuery, token);

    return result;
};

export const updateGroups = async (data: {}, tokenPromise: Promise<string | null>): Promise<GetGroupListResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<GetGroupListResponse>(updateGroupApi, data, token);

    return result;
};

export const uploadFile = async (data: {}, tokenPromise: Promise<string | null>): Promise<FileResponse> => {
    const token = await tokenPromise;
    const result = await opsService.postdata<FileResponse>(uploadImageApi, data, token);

    return result;
};



export const getGroupsById = async (id: string, tokenPromise: Promise<string | null>): Promise<GroupResponse> => {
    const token = await tokenPromise;
    const urlWithId = `${getGroupByIdApi}?id=${id}`;

    const result = await opsService.getData<GroupResponse>(urlWithId, token);
    console.log(result,"jhnrejhdfhre")

    return result;
};

export const groupCreate = async (data: {}, tokenPromise: Promise<string | null>): Promise<GroupResponse> => {

    const token = await tokenPromise;

    const result = await opsService.postdata<GroupResponse>(groupCreateApi, data, token);

    return result;
};
