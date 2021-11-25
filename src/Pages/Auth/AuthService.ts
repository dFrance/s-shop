import axios from "axios";
import { FormEvent } from "react";

export interface UserLoginProps {
    email: string;
    password: string;
}

export interface UserRegisterProps {
    name: string,
    email: string;
    password: string;
}

// interface AuthApiProps {
//     e: FormEvent;
//     data: UserLoginProps;
//     setData: any;
// }

// interface RegisterApiProps {
//     e: FormEvent;
//     data: UserRegisterProps;
//     setMessageResponse: any;
// }

export async function AuthApi(e: FormEvent, data: UserLoginProps, setData: any){
    e.preventDefault();
    await axios({method: 'post', url: `http://localhost:8080/Login`, data})
    .then((response) => setData(response.data))
}

export async function RegisterApi(e: FormEvent, data: UserRegisterProps, setMessageResponse: any) {
    e.preventDefault();
    await axios({ method: 'post', url: "http://localhost:8080/user/novo", data })
        .then((response) => setMessageResponse(response.data))
        .catch((err) => setMessageResponse(err.response.data))
}