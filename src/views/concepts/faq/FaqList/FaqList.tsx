import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import FaqListTable from './components/FaqListTable'
import FaqListActionTools from './components/FaqListActionTools'
import FaqsListTableTools from './components/FaqListTableTools'
// import FaqListSelected from './components/FaqListSelected'

const FaqList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Faq</h3>
                            <FaqListActionTools />
                        </div>
                        <FaqsListTableTools />
                        <FaqListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/* <FaqListSelected /> */}
        </>
    )
}

export default FaqList
