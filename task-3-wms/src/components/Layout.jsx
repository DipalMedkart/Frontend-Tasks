// components/Layout.js
import { useRouter } from 'next/router';
import DashboardBar from './DashboardBar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const router = useRouter();
    const isLoginPage = router.pathname === '/login';

    return (
        <div>
            {!isLoginPage && <DashboardBar />}
            {!isLoginPage && <Navbar />}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
