import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Root;
