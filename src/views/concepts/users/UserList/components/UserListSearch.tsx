import { forwardRef } from 'react'
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'

type UserListSearchProps = {
    onInputChange: (value: string) => void
}

const UserListSearch = forwardRef<
    HTMLInputElement,
    UserListSearchProps
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

UserListSearch.displayName = 'UserListSearch'

export default UserListSearch
