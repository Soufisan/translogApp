import { Outlet } from "react-router-dom"


export const OperatorLayout = () => {
  return (
    <>
        <header>
            <h2>NavBar Operador</h2>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer></footer>
    </>
  )
}
