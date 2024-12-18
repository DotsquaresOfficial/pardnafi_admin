

export type GetInquiryListResponse = {
    list: Inquiry[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Inquiry = {
    id: string
    firstName: string
    lastName: string
    email: string
    contactNumber: number,
    message: string

}
