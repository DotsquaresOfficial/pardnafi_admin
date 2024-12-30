import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useKycList from '../hooks/useKycList'
import { CSVLink } from 'react-csv'

const KycListActionTools = () => {
    const navigate = useNavigate()

    const { kycList } = useKycList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={kycList}
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

export default KycListActionTools
