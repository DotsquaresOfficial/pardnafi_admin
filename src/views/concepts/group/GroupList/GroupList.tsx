import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import GroupListTable from './components/GroupListTable'
import GroupListActionTools from './components/GroupListActionTools'
import GroupsListTableTools from './components/GroupListTableTools'


const GroupList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Groups</h3>
                            <GroupListActionTools />
                        </div>
                        <GroupsListTableTools />
                        <GroupListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/* <GroupListSelected /> */}
        </>
    )
}

export default GroupList
