import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/Avatar'
import { kycStatusColors } from '@/utils/kycStatusColors'
import { UsersResponse } from '../UserList/types'
import { KycStatus } from '@/constants/enum'
import { Tag } from '@/components/ui'
import { statusColor } from '@/utils/accountStatusColors'
type UserInfoFieldProps = {
    title?: string
    value?: string
    user_details?: {}
}



type ProfileSectionProps = {
    data: UsersResponse;
};



const UserInfoField = ({ title, value, user_details }: UserInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className={kycStatusColors[user_details as keyof typeof kycStatusColors] || ''}>
                {value}
            </p>
        </div>

    )
}

const ProfileSection = ({ data }: ProfileSectionProps) => {

    const { user_details, kyc_details } = data?.data || {};





    return (
        <>
            <Card >
                <div className="flex items-center gap-2 mb-8">
                    <h4>User Details</h4>
                    <Tag >
                        <span
                            className={`capitalize font-semibold `}
                        >
                            User Details
                        </span>
                    </Tag>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Name:-</span>
                        {`${user_details?.firstName}   ${user_details?.lastName}`}
                    </div>


                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Email:-</span>
                        {user_details?.email ?? 'N/A'}
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <span className="font-semibold">Phone:-</span>
                        {user_details?.phoneNumber ?? 'N/A'}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Address:-</span>
                        {user_details?.address ?? 'N/A'}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Department:-</span>
                        {user_details?.departmentName ?? 'N/A'}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Designation:-</span>
                        {user_details?.designation ?? 'N/A'}
                    </div> */}

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">KYC Status:-</span>


                        <Tag className={kycStatusColors[user_details?.kycStatus] || ''}>
                            {user_details?.kycStatus === KycStatus.NOT_SUBMITTED
                                ? "NOT SUBMITTED"
                                : user_details?.kycStatus === KycStatus.PENDING_REVIEW
                                    ? "PENDING REVIEW"
                                    : user_details?.kycStatus === KycStatus.APPROVED
                                        ? "APPROVED"
                                        : user_details?.kycStatus === KycStatus.REJECTED
                                            ? "REJECTED"
                                            : 'N/A'}
                        </Tag>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Wallet Address:-</span>
                        {user_details?.walletAddress ?? 'N/A'}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Account Status:-</span>
                        <Tag className={
                            user_details?.isActive
                                ? statusColor["active"]
                                : statusColor["blocked"]
                        }> {user_details?.isActive ? 'active' : 'blocked'}</Tag>

                    </div>

                 

                </div>



            </Card>


        </>
    )
}

export default ProfileSection
