import ConfigProvider from '@/components/ui/ConfigProvider'
import { themeConfig } from '@/configs/theme.config'
import useDarkMode from '@/utils/hooks/useDarkMode'
import useTheme from '@/utils/hooks/useTheme'
import useLocale from '@/utils/hooks/useLocale'
import useDirection from '@/utils/hooks/useDirection'
import type { CommonProps } from '@/@types/common'

const Theme = (props: CommonProps) => {
    useTheme()
    useDarkMode()
    useDirection()

    const { locale } = useLocale()
    
    return (
        <ConfigProvider
            value={{
                locale: locale,
                ...themeConfig,
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default Theme