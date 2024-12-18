import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useFaqList from '../hooks/useFaqList'
import { CSVLink } from 'react-csv'

const FaqListActionTools = () => {
    const navigate = useNavigate()

    const { faqList } = useFaqList()

    console.log(faqList,"faqList====")

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="faqList.csv"
                data={faqList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
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
