

export type GetAboutUsListResponse = {
    data?: Array<{
        question: string;
        answer: string;
        _id: string;
      }>
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type AboutUs = {
    _id: string
    question: string
    answer: string
    
}
