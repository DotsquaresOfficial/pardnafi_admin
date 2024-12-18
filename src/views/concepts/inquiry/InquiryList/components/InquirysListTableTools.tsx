import useInquiryList from '../hooks/useInquiryList'
import InquiryListSearch from './InquiryListSearch'
import InquiryTableFilter from './InquiryListTableFilter'
import cloneDeep from 'lodash/cloneDeep'

const CustomersListTableTools = () => {
    const { tableData, setTableData } = useInquiryList()

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
            <InquiryListSearch onInputChange={handleInputChange} />
            <InquiryTableFilter />
        </div>
    )
}

export default CustomersListTableTools