import Admins from './Pages/Admins';
import Books from './Pages/Books';
import Users from './Pages/Users';
import BorrowedBooks from './Pages/BorrowedBooks';
import Report from './Pages/Report';
import Request from './Pages/Request';

const Dashboard = ({selectedButton}) => {
    return (  
        <main className='px-4 min-h-screen'>
            {selectedButton === 'Admins' && <Admins />}
            {selectedButton === 'Books' && <Books />}
            {selectedButton === 'Users' && <Users />}
            {selectedButton === 'Home' && <Books />}
            {selectedButton === 'Borrowed Books' && <BorrowedBooks />}
            {selectedButton === 'Report' && <Report />}
            {selectedButton === 'Request' && <Request />}
        </main>
    );
}
 
export default Dashboard;