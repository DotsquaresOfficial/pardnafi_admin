import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import TermsListTable from './components/TermsListTable'


const TermsList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Terms and Conditions</h3>
                            {/* <TermsListActionTools /> */}
                        </div>
                        {/* <TermsListTableTools /> */}
                        <TermsListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/* <FaqListSelected /> */}
        </>
    )
}

export default TermsList
