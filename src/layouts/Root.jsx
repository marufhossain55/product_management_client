import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

const Root = () => {
  return (
    <div>
      <Navbar />

      <div className="container mt-6 mb-6 mx-auto min-h-[calc(100vh-330px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Root;
