import Button from '@/components/ui/Button'
import {  TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useFaqList from '../hooks/useFaqList'


const FaqListActionTools = () => {
    const navigate = useNavigate()

    const { faqList } = useFaqList()

    

    return (
        <div className="flex flex-col md:flex-row gap-3">
           
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/concepts/faq/faq-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default FaqListActionTools
