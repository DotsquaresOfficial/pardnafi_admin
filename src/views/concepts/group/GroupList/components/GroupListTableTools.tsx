import useGroupList from '../hooks/useGroupList'
import GroupListSearch from './GroupListSearch'
// import CustomerTableFilter from './CustomerListTableFilter'
import cloneDeep from 'lodash/cloneDeep'

const GroupListTableTools = () => {
    const { tableData, setTableData } = useGroupList()

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
            <GroupListSearch onInputChange={handleInputChange} />
            {/* <CustomerTableFilter /> */}
        </div>
    )
}

export default GroupListTableTools
