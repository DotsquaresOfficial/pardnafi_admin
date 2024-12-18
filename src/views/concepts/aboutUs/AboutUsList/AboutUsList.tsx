import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import AboutUsListTable from './components/AboutUsListTable'



const FaqList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>About Us</h3>                    
                        </div>
                        <AboutUsListTable />
                    </div>
                </AdaptiveCard>
            </Container>
          
        </>
    )
}

export default FaqList
