import useFaqList from '../hooks/useFaqList'
import FaqListSearch from './FaqListSearch'

import cloneDeep from 'lodash/cloneDeep'

const FaqListTableTools = () => {
    const { tableData, setTableData } = useFaqList()

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
            <FaqListSearch onInputChange={handleInputChange} />
            {/* <FaqTableFilter /> */}
        </div>
    )
}

export default FaqListTableTools