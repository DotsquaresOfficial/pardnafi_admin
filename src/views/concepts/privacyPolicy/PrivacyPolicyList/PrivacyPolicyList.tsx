import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import PrivacyPolicyListTable from './components/PrivacyPolicyListTable'

// import FaqListSelected from './components/FaqListSelected'

const TermsList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Privacy and Policy</h3>
                        </div>
                        <PrivacyPolicyListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/* <FaqListSelected /> */}
        </>
    )
}

export default TermsList
