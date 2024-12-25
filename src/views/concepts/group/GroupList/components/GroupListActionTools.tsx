import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useGroupList from '../hooks/useGroupList'
import { CSVLink } from 'react-csv'

const GroupListActionTools = () => {
    const navigate = useNavigate()

    const { groupList } = useGroupList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={groupList}
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
                onClick={() => navigate('/concepts/group/group-create')}
            >
                Add new
            </Button>
           
        </div>
    )
}

export default GroupListActionTools
