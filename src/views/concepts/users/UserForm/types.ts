import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    id?: string,
    _id?: string,
    firstName?: string
    lastName?: string
    email?: string,
    avatar?: string,
    address?: string,
    dialCode?: string
    phoneNumber?: string
    img?: string,
    isActive?: boolean,
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
    isActive: boolean,
}

export type UserFormSchema = OverviewFields

export type FormSectionBaseProps = {
    control: Control<UserFormSchema>
    errors: FieldErrors<UserFormSchema>
}
