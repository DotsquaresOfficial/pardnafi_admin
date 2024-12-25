import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/Avatar'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import dayjs from 'dayjs'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import {
    FaXTwitter,
    FaFacebookF,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

type UserInfoFieldProps = {
    title?: string
    value?: string
}

type ProfileSectionProps = {
    data: Partial<{
        id: string
        img: string
        name: string
        email: string
        lastOnline: number
        personalInfo: {
            location: string
            title: string
            birthday: string
            phoneNumber: string
            facebook: string
            twitter: string
            pinterest: string
            linkedIn: string
        }
    }>
}

const UserInfoField = ({ title, value }: UserInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const GroupSection = ({ data = {} }: ProfileSectionProps) => {
    const navigate = useNavigate()

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSocialNavigate = (link: string = '') => {
        window.open(`https://${link}`, '_blank', 'rel=noopener noreferrer')
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDelete = () => {
        setDialogOpen(false)
        navigate('/concepts/users/user-list')
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                User successfuly deleted
            </Notification>,
        )
    }

    const handleSendMessage = () => {
        navigate('/concepts/chat')
    }

    const handleEdit = () => {
        navigate(`/concepts/users/user-edit/${data.id}`)
    }

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Tooltip title="Edit User">
                    <button
                        className="close-button button-press-feedback"
                        type="button"
                        onClick={handleEdit}
                    >
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    {/* <Avatar size={90} shape="circle" src={data.img} /> */}
                    {/* <h4 className="font-bold">{data.name}</h4> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                <UserInfoField title="Name" value={data.name} />
                    <UserInfoField title="Email" value={data.email} />
                   
                    <UserInfoField
                        title="Registration date"
                        value={data.personalInfo?.birthday}
                    />
                   
                </div>
              
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete User"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDelete}
                >
                    <p>
                        Are you sure you want to delete this User? All
                        record related to this User will be deleted as well.
                        This action cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

export default GroupSection
