import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    id?:string,
    _id?: string,
    question: string
    answer: string
   
}

export type AddressFields = {
    country: string
    address: string
    postcode: string
    city: string
}

export type ProfileImageFields = {
    img: string
}

export type TagsFields = {
    tags: Array<{ value: string; label: string }>
}

export type AccountField = {
    banAccount?: boolean
    accountVerified?: boolean
}

export type FaqFormSchema = OverviewFields 
// &
//     AddressFields &
//     ProfileImageFields &
//     TagsFields &
//     AccountField

export type FormSectionBaseProps = {
    control: Control<FaqFormSchema>
    errors: FieldErrors<FaqFormSchema>
}
