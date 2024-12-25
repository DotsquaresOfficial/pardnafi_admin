import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useUserList from '../hooks/useUserList'
import { CSVLink } from 'react-csv'

const UserListActionTools = () => {
    const navigate = useNavigate()

    const { userList } = useUserList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={userList}
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

export default UserListActionTools
