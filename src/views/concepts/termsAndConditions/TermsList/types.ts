

export type GetTermsListResponse = {
    success: Boolean
    message: string
    data: []

    total: number
    updatedPages: Array<{
        slug: string;
        title?: string; subTitle?: string; description?: string
    }>;
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Terms = {
    _id: string
    question: string
    answer: string

}

export type PageData = {
    slug: string;
    title?: string;
    subTitle?: string;
    description?: string;

}

export interface TermsResponse {
    updatedPages?: PageData[];
}
