import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Test from './Test';
import Dashboard from './pages/Dashboard';
import Side from './Side';
import Consultant from './pages/Consultant';

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
        <Route path='/' element={<Test />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/consultant' element={<Consultant />}/>
      </Routes>
    </div>
  );
}

export default App;
