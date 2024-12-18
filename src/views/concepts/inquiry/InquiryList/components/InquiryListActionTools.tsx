import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useInquiryList from '../hooks/useInquiryList'
import { CSVLink } from 'react-csv'

const InquiryListActionTools = () => {
    const navigate = useNavigate()

    const { inquiryList } = useInquiryList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={inquiryList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
           
        </div>
    )
}

export default InquiryListActionTools
