import { Button, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Header } from "../../../components/Header";
import { ContainerAuth, ErrorMessage, SubtitleAuth, Title } from "../style";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "../../../context/user";
import { useHistory } from "react-router";
import { RegisterApi, UserRegisterProps } from "../AuthService";

export function RegisterPage() {
    const [viewPassword, setViewPassword] = useState(false)
    const { userData, setUserData } = useUserData()
    const history = useHistory();
    const [messageResponse, setMessageResponse] = useState({
        error: true,
        message: '',
    });
    const [data, setData] = useState<UserRegisterProps>({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        if(!messageResponse.error){
            history.push('/login')
        }
    })
    
    return (
        <>
            <Header />
            <ContainerAuth onSubmit={(e) => RegisterApi(e, data, setMessageResponse)}>
                <Title>
                    S-Shop
                </Title>
                <TextField
                    variant="outlined"
                    required fullWidth
                    type="text"
                    placeholder="Digite seu nome"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />

                <TextField
                    variant="outlined"
                    required fullWidth
                    type="email"
                    placeholder="Digite seu email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />

                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type={viewPassword ? "text" : "password"}
                    placeholder="Digite seu password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setViewPassword(!viewPassword)}>
                                {!viewPassword ?
                                    <VisibilityIcon />
                                    :
                                    <VisibilityOffIcon />
                                }
                            </IconButton>
                        </InputAdornment>,
                    }} />
                <Button type="submit" variant="contained" color="primary">Criar conta</Button>
                <SubtitleAuth>Já possui conta? <a href="/login">Login!</a></SubtitleAuth>
                <ErrorMessage>
                    {messageResponse.message !== '' &&
                        messageResponse.message
                    }
                </ErrorMessage>
            </ContainerAuth>
        </>
    )
}