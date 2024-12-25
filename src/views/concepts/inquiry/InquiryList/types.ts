

export type GetInquiryListResponse = {
    message: string;  
    status: number;    
    success: boolean; 
    tickets: Inquiry[]; 
    data?:Inquiry[]
    total?:number
};

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Inquiry = {
    _id: string;
    Name: string;
    Company: string;
    jobTitle: string;
    contactNumber: number;
    email: string;
    message: string;
    isReplied: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
