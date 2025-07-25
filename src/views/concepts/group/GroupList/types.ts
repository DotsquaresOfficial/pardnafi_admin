

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}



export type Group = {
    owner:string;
    avatar: string;
    isDeleted: boolean;
    isActive: boolean;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    groupAddress:string;
    txHash: string;
    id: string;
}

export type GetGroupListResponse = {
    message: string;
    success: boolean;
    status: number;
    total?: number;
    data?: GroupData[];
}

export interface GroupResponse {
    message: string;
    success: boolean;
    status: number;
    data?: GroupData;
}

// export interface GroupData {
//     description: string;
//     isDeleted: boolean;
//     _id: string;
//     groupImage: string;
//     groupName: string;
//     createdBy: string;
//     members: string[];  
//     createdAt: string;  
//     updatedAt: string;  
//     __v: number;
// }
export interface GroupData {
    _id: string;
    groupId: string;
    groupName: string;
    groupImage: string;
    description: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isDeleted: boolean;
    isPublic: boolean;
    isDaoSupported: boolean;
    txHash: string;
    groupAddress: string;
    owner: string;
    frequencyPrice: string;
    frequencyTime: number;
    groupSize: string;
    duration: number;
    invites: any[];

    id: string;
    avatar: any;
    isActive: any;
    firstName: any;
    lastName: any;
    email: any;
    phone: any;// You can specify a proper type instead of `any` if you know the shape
}





export interface DeleteResponse {
    status: boolean;
    message: string;
    success: boolean;
}

export interface DeleteData {
    id: string | number;
    status: boolean

}