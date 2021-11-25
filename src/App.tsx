import { AdminPage } from './Pages/Admin';
import { UserPage } from './Pages/User';
import {BrowserRouter, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from './routes';


function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
