import './App.css';
import SplashScreen from './components/SplashScreen';
import {Route, Routes} from 'react-router-dom';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SplashScreen />}/>
        <Route path='/dashboard' element={<AdminPanel />}/>
      </Routes>
    </div>
  );
}

export default App;
