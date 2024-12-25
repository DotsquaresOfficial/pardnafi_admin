import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import GroupForm from '../GroupForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import type { GroupFormSchema } from '../GroupForm'
import { groupCreate } from '@/services/GroupService'
import { useToken } from '@/store/authStore'


const GroupCreate = () => {
    const navigate = useNavigate()
    const {token} = useToken()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);  
    };

    const handleFormSubmit = async (values: GroupFormSchema) => {
        console.log("callll")
        setIsSubmiting(true)
        await sleep(800)
        const tokenPromise =  someAsyncTokenFetchFunction()
      const groupImage =  localStorage.getItem("groupImage")
        const resp = await groupCreate({...values,groupImage},tokenPromise)
      if(resp?.success){
        setIsSubmiting(false)
        toast.push(
            <Notification type="success">{resp?.message}</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/group/group-list')

      }else{
        toast.push(
            <Notification type="danger">{resp?.message}</Notification>,
            { placement: 'top-center' },
        )
      }
      
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Group discardd!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/group/group-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <GroupForm
                newGroup
                defaultValues={{
                    groupName: '',
                    description:'',
                    groupImage:""

                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </GroupForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default GroupCreate
