import { AdminPage } from './Pages/Admin';
import { UserPage } from './Pages/User';
import {BrowserRouter, Route} from 'react-router-dom'


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
    </div>
  );
}

export default App;
