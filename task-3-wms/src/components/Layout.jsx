// components/Layout.js
import { useRouter } from 'next/router';
import DashboardBar from './DashboardBar';
import Navbar from './Navbar';
import BreadCrumbs from './BreadCrumbs';

const Layout = ({ children }) => {
    const router = useRouter();
    const isLoginPage = router.pathname === '/login';

    return (
        <div>
            {!isLoginPage && <DashboardBar />}
            {!isLoginPage && <Navbar />}
            {!isLoginPage && <BreadCrumbs />}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
