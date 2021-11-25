import { AdminPage } from './Pages/Admin';
import { UserPage } from './Pages/User';
import { BrowserRouter, Route } from 'react-router-dom'
import { LoginPage } from './Pages/Auth/Login';
import { RegisterPage } from './Pages/Auth/Register';

export function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" >
                <UserPage />
            </Route>
            <Route path="/admin" >
                <AdminPage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/register">
                <RegisterPage />
            </Route>
        </BrowserRouter>
    )
}