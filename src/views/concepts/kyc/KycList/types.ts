

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}



export type Kyc ={
    avatar: string;
    isDeleted: boolean;
    isActive: boolean;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    id:string;
    datas?:KycData|undefined
  }
  
  export type GetKycListResponse =  {
    message: string;
    success: boolean;
    status: number;
    total?: number;
    users?: Kyc[];
  }

  export interface KycResponse {
    message: string;
    success: boolean;
    status: number;
    data: KycData[];
    datas?:KycData|undefined
}

export interface KycData {
    avatar?: string;
    isDeleted: boolean;
    isActive: boolean;
    phoneNumber?:any;
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    id?:string;
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