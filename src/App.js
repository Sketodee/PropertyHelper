import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Consultant from './pages/Consultant';
import Client from './pages/Client';
import Home from './pages/Home';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element= {<PersistLogin />}>

          <Route path='/dashboard' element={<RequireAuth />}>

            <Route index element={<Dashboard />} />
            <Route path='/dashboard/consultant' element={<Consultant />} />
            <Route path='/dashboard/client' element={<Client />} />
            
          </Route>

        </Route>
      </Routes>

    </div>
  );
}

export default App;
