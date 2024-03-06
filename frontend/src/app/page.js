import AddUserDetails from '../components/AddUserDetails'
import FetchUser from '../components/FetchUser'
// import AddUserDetails from '../components/AddUserDetails';
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"
        >

            <div >
                <AddUserDetails />
                <FetchUser />
            </div>

        </main>
    )
}
