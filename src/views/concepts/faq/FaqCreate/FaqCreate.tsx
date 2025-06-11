import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import FaqForm from '../FaqForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import type { FaqFormSchema } from '../FaqForm'
import { faqCreate } from '@/services/FaqServices'
import { useToken } from '@/store/authStore'


const FaqEdit = () => {
    const navigate = useNavigate()
    const {token} = useToken()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const someAsyncTokenFetchFunction = async (): Promise<string | null> => {
        return Promise.resolve(token);  
    };

    const handleFormSubmit = async (values: FaqFormSchema) => {
        setIsSubmiting(true)
        await sleep(800)
        const tokenPromise =  someAsyncTokenFetchFunction()
        const resp = await faqCreate(values,tokenPromise)
      if(resp?.success){
        setIsSubmiting(false)
        toast.push(
            <Notification type="success">{resp?.message}</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/faq/faq-list')

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
            <Notification type="success">Faq discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/faq/faq-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <FaqForm
                newFaq
                defaultValues={{
                    question: '',
                    answer: '',

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
            </FaqForm>
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

export default FaqEdit
