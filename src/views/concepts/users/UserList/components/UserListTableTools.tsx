import useUserList from '../hooks/useUserList'
import UserListSearch from './UserListSearch'
// import CustomerTableFilter from './CustomerListTableFilter'
import cloneDeep from 'lodash/cloneDeep'
import UserListTableFilter from './UserListTableFilter'

const UserListTableTools = () => {
    const { tableData, setTableData } = useUserList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <UserListSearch onInputChange={handleInputChange} />
            {/* <UserListTableFilter /> */}
        </div>
    )
}

export default UserListTableTools
