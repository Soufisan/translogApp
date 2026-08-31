import { Outlet } from 'react-router-dom';
export const PublicLayout = () => {
  return (
    <>
      <header>
        <h3>NavBar Publico</h3>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h3>Footer</h3>
      </footer>
    </>
  );
};
