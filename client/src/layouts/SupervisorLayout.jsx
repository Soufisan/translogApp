import { Outlet } from "react-router-dom"

export const SupervisorLayout = () => {
  return (
    <>
      <header>
        <h2>NavBar Supervisor</h2>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer></footer>
    </>
  )
}

