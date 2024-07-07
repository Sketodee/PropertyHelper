import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Consultant from './pages/Consultant';
import Client from './pages/Client';
import Home from './pages/Home';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';
import LoginPage from './pages/LoginPage'
import Product from './pages/Product';
import ProductPage from './pages/ProductPage';
import ProductDetail from './components/product/ProductDetail';
import ConsultantGroup from './pages/ConsultantGroup';
import ConsultantGroupPage from './pages/ConsultantGroupPage';
import ConsultantGroupDetail from './components/consultantGroup/ConsultantGroupDetail';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<PersistLogin />}>

          <Route path='/dashboard' element={<RequireAuth />}>

            <Route index element={<Dashboard />} />
            <Route path='/dashboard/consultant' element={<Consultant />} />

            <Route path='/dashboard/product' element={<ProductPage />}>
              <Route index element={<Product />} />
              <Route path='/dashboard/product/:Id' element={<ProductDetail />} />
            </Route>

            {/* <Route path='/dashboard/product' element={<Product/>} /> */}
            <Route path='/dashboard/client' element={<Client />} />

            <Route path='/dashboard/consultantgroup' element={<ConsultantGroupPage />}>
              <Route index element={<ConsultantGroup />} />
              <Route path='/dashboard/consultantgroup/:Id' element={<ConsultantGroupDetail />} />
            </Route>


          </Route>

        </Route>
      </Routes>

    </div>
  );
}

export default App;
