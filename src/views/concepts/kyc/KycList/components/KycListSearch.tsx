import { forwardRef } from 'react'
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'

type KycListSearchProps = {
    onInputChange: (value: string) => void
}

const KycListSearch = forwardRef<
    HTMLInputElement,
    KycListSearchProps
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

KycListSearch.displayName = 'KycListSearch'

export default KycListSearch
