import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import InquiryListTable from './components/InquiryListTable'
import InquiryListActionTools from './components/InquiryListActionTools'
import InquirysListTableTools from './components/InquirysListTableTools'
import InquiryListSelected from './components/InquiryListSelected'

const CustomerList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Inquiry</h3>
                            <InquiryListActionTools />
                        </div>
                        <InquirysListTableTools />
                        <InquiryListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <InquiryListSelected />
        </>
    )
}

export default CustomerList
