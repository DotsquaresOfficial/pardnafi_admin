import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import KycListListTable from './components/KycListTable'
import KycListListActionTools from './components/KycListActionTools'
import KycListListTableTools from './components/KycListTableTools'


const KycList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3> Kyc Users</h3>
                            <KycListListActionTools />
                        </div>
                        <KycListListTableTools />
                        <KycListListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/* <KycListSelected /> */}
        </>
    )
}

export default KycList
