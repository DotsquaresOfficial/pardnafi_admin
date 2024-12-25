import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import CustomerListTable from './components/UserListTable'
import CustomerListActionTools from './components/UserListActionTools'
import CustomersListTableTools from './components/UserListTableTools'


const CustomerList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Users</h3>
                            <CustomerListActionTools />
                        </div>
                        <CustomersListTableTools />
                        <CustomerListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/* <CustomerListSelected /> */}
        </>
    )
}

export default CustomerList
