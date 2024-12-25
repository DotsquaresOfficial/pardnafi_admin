

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}



export type User ={
    avatar: string;
    isDeleted: boolean;
    isActive: boolean;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    id:string;
  }
  
  export type GetUsersListResponse =  {
    message: string;
    success: boolean;
    status: number;
    total?: number;
    users?: User[];
  }

  export interface GroupsResponse {
    message: string;
    success: boolean;
    status: number;
    data: GroupData[];
}

export interface GroupData {
    description: string;
    isDeleted: boolean;
    _id: string;
    groupImage: string;
    groupName: string;
    createdBy: string;
    members: string[];  
    createdAt: string;  
    updatedAt: string;  
    __v: number;
}

  

export interface DeleteResponse {
    status: boolean;
    message: string;
    success: boolean;
}

export interface DeleteData {
    id: string | number;
    status:boolean

}