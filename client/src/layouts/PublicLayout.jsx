import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavBar/>
        
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
      </footer>
    </>
  );
};
