import { useState } from 'react'
import Card from '@/components/ui/Card'

import Avatar from '@/components/ui/Avatar/Avatar'

import { UsersResponse } from '../UserList/types'
import { Tag } from '@/components/ui'

type UserInfoFieldProps = {
    title?: string
    value?: string
}



type KycSectionProps = {
    data: UsersResponse;
};



const UserInfoField = ({ title, value }: UserInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const KycSection = ({ data }: KycSectionProps) => {

    const { kyc_details } = data?.data || {};





    return (
        <>
           <Card className="w-full">
    <div className="flex items-center gap-2 mb-8">
        <h4>KYC Details</h4>
        <Tag>
            <span className="capitalize font-semibold">
                KYC Details
            </span>
        </Tag>
    </div>

    <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
            <span className="font-semibold">Phone Number:-</span>
            {kyc_details?.contact_information?.phone_number ?? 'N/A'}
        </div>

        <div className="flex items-center justify-between">
            <span className="font-semibold">Preferred Contact Method:-</span>
            {kyc_details?.contact_information?.preferred_contact_method ?? 'N/A'}
        </div>

        <div className="flex items-center justify-between">
            <span className="font-semibold">Email:-</span>
            {kyc_details?.contact_information?.email ?? 'N/A'}
        </div>

        <div className="flex items-center justify-between">
            <span className="font-semibold">ID Type:-</span>
            {kyc_details?.identification_details?.id_type ?? 'N/A'}
        </div>

        <div className="flex items-center justify-between">
            <span className="font-semibold">ID Number:-</span>
            {kyc_details?.identification_details?.id_number ?? 'N/A'}
        </div>

        <div className="flex items-center justify-between">
            <span className="font-semibold">Issued By:-</span>
            {kyc_details?.identification_details?.issued_by ?? 'N/A'}
        </div>

        <div className="flex items-center justify-between">
            <span className="font-semibold">ID Issue Date:-</span>
            {kyc_details?.identification_details?.id_issue_date ?? 'N/A'}
        </div>

        <div className="flex items-center justify-between">
            <span className="font-semibold">ID Expiry Date:-</span>
            {kyc_details?.identification_details?.id_expiry_date ?? 'N/A'}
        </div>
    </div>
</Card>



        </>
    )
}

export default KycSection
