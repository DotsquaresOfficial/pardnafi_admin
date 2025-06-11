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
                        <span className="capitalize font-semibold">KYC Details</span>
                    </Tag>
                </div>

                <div className="flex flex-col gap-5">
                    {/* Personal Information */}
                    <div className="font-semibold">Personal Information</div>
                    <div className="flex justify-between"><span>Date of Birth:</span> {kyc_details?.personal_information?.date_of_birth ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Nationality:</span> {kyc_details?.personal_information?.nationality ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Gender:</span> {kyc_details?.personal_information?.gender ?? 'N/A'}</div>

                    {/* Contact Information */}
                    <div className="font-semibold mt-4">Contact Information</div>
                    <div className="flex justify-between"><span>Phone Number:</span> {kyc_details?.contact_information?.phone_number ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Preferred Contact Method:</span> {kyc_details?.contact_information?.preferred_contact_method ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Email:</span> {kyc_details?.email ?? 'N/A'}</div>

                    {/* Identification Details */}
                    <div className="font-semibold mt-4">Identification Details</div>
                    <div className="flex justify-between"><span>ID Type:</span> {kyc_details?.identification_details?.id_type ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>ID Number:</span> {kyc_details?.identification_details?.id_number ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Issued By:</span> {kyc_details?.identification_details?.issued_by ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>ID Issue Date:</span> {kyc_details?.identification_details?.id_issue_date ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>ID Expiry Date:</span> {kyc_details?.identification_details?.id_expiry_date ?? 'N/A'}</div>

                    {/* Address Information */}
                    <div className="font-semibold mt-4">Address Information</div>
                    <div className="flex justify-between"><span>Residential Address:</span> {kyc_details?.address_information?.residential_address ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Address Proof Type:</span> {kyc_details?.address_information?.address_proof_type ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Address Proof Document:</span> {kyc_details?.address_information?.address_proof_document ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Address Verification Date:</span> {kyc_details?.address_information?.address_verification_date ?? 'N/A'}</div>

                    {/* Employment Information */}
                    <div className="font-semibold mt-4">Employment Information</div>
                    <div className="flex justify-between"><span>Occupation:</span> {kyc_details?.employment_information?.occupation ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Employer Name:</span> {kyc_details?.employment_information?.employer_name ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Employer Address:</span> {kyc_details?.employment_information?.employer_address ?? 'N/A'}</div>

                    {/* Financial Information */}
                    <div className="font-semibold mt-4">Financial Information</div>
                    <div className="flex justify-between"><span>Annual Income:</span> ₹{kyc_details?.financial_information?.annual_income?.toLocaleString() ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Source of Funds:</span> {kyc_details?.financial_information?.source_of_funds ?? 'N/A'}</div>
                    <div className="flex justify-between"><span>Tax Identification Number:</span> {kyc_details?.financial_information?.tax_identification_number ?? 'N/A'}</div>
                </div>
            </Card>




        </>
    )
}

export default KycSection
