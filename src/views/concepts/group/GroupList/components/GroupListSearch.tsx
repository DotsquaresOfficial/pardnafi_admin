import { forwardRef } from 'react'
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'

type GroupListSearchProps = {
    onInputChange: (value: string) => void
}

const GroupListSearch = forwardRef<
    HTMLInputElement,
    GroupListSearchProps
>((props, ref) => {
    const { onInputChange } = props

    return (
        <DebouceInput
            ref={ref}
            placeholder="Quick search..."
            suffix={<TbSearch className="text-lg" />}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
})

GroupListSearch.displayName = 'GroupListSearch'

export default GroupListSearch
