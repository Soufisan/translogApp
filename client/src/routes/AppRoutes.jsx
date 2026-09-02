import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { SupervisorLayout } from '../layouts/SupervisorLayout';
import { OperatorLayout } from '../layouts/OperatorLayout';
import { AuthContext } from '../context/CreateContext';


const Login = lazy(() => import('../pages/PublicPages/Auth/Login/Login'));
const Register = lazy(()=> import('../pages/PublicPages/Auth/Register/Register'))
const Tracking = lazy(()=> import('../pages/PublicPages/Tracking/Tracking'));
const CreateShipment = lazy(() => import('../pages/OperatorPages/CreateShipment/CreateShipment'));
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'));
const UserList = lazy(() => import('../pages/SupervisorPages/Users/Users'));
const ShipmentList = lazy(() => import('../pages/OperatorPages/Shipment/Shipment'))
const Home = lazy(() => import('../pages/PublicPages/Home/Home'))
export const AppRoutes = () => {

    const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
        <Suspense>
            <Routes>
                <Route element={<PublicRoutes  user={user}/>}>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/tracking" element={<Tracking />} />
                        
                    </Route>
                </Route>

                <Route element={<PrivateRoutes user={user} requiredType={1} /> }>
                    <Route element={<SupervisorLayout />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/users" element={<UserList />} />
                    </Route>
                </Route>

                <Route element={<PrivateRoutes user={user} requiredType={2}/>}>
                    <Route element={<OperatorLayout/>}>
                        <Route path="/user/createShipment" element={<CreateShipment />} />
                        <Route path="/user/shipment" element={<ShipmentList />} />
                    </Route>
                </Route>

                <Route path='*' element={<ErrorPage/>}/>


            </Routes>
        </Suspense>

      
    </BrowserRouter>
  )
}

