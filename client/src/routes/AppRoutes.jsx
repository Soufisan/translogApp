import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { SupervisorLayout } from '../layouts/SupervisorLayout';
import { OperatorLayout } from '../layouts/OperatorLayout';


const Login = lazy(() => import('../pages/PublicPages/Auth/Login/Login'));
const Register = lazy(()=> import('../pages/PublicPages/Auth/Register/Register'))
const Tracking = lazy(()=> import('../pages/PublicPages/Tracking/Tracking'));
const CreateShipment = lazy(() => import('../pages/OperatorPages/CreateShipment/CreateShipment'))
export const AppRoutes = () => {


  return (
    <BrowserRouter>
        <Suspense>
            <Routes>
                <Route element={<PublicRoutes  />}>
                    <Route element={<PublicLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/tracking" element={<Tracking />} />
                    </Route>
                </Route>

                <Route element={<PrivateRoutes/>}>
                    <Route element={<SupervisorLayout />}>
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Route>

                <Route element={<PrivateRoutes/>}>
                    <Route element={<OperatorLayout/>}>
                        <Route path="/operator/createShipment" element={<CreateShipment />} />
                    </Route>
                </Route>


            </Routes>
        </Suspense>

      
    </BrowserRouter>
  )
}

