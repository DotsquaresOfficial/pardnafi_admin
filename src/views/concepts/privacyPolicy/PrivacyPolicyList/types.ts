

export type GetPrivacyPolicyListResponse = {
    success:Boolean
    message:string
    data: []
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type PrivacyPolicy = {
    _id: string
    question: string
    answer: string
    
}
