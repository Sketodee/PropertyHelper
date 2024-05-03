import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Side from './Side';
import Consultant from './pages/Consultant';
import Client from './pages/Client';

function App() {

  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
      setDark(!dark);
      document.body.classList.toggle("dark");
  }

  return (
    <div>
      <Side darkModeHandler= {darkModeHandler} dark = {dark}/>
      <Routes>
        {/* <Route path='/' element={<Test />}/> */}
        <Route path='/' element={<Dashboard />}/>
        <Route path='/consultant' element={<Consultant />}/>
        <Route path='/client' element={<Client />}/>
      </Routes>
    </div>
  );
}

export default App;
