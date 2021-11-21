import { AdminPage } from './Pages/Admin';
import { UserPage } from './Pages/User';
import {BrowserRouter, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <UserPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
