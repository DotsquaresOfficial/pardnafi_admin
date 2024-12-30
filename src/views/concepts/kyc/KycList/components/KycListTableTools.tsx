import useKycList from '../hooks/useKycList'
import KycListSearch from './KycListSearch'
// import CustomerTableFilter from './CustomerListTableFilter'
import cloneDeep from 'lodash/cloneDeep'

const KycListTableTools = () => {
    const { tableData, setTableData } = useKycList()

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
            <KycListSearch onInputChange={handleInputChange} />
            {/* <CustomerTableFilter /> */}
        </div>
    )
}

export default KycListTableTools
