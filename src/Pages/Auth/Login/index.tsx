import { Button, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Header } from "../../../components/Header";
import { ContainerAuth, SubtitleAuth, Title } from "../style";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { FormEvent, useState } from "react";
import axios from "axios";
import { useUserData } from "../../../context/user";
import { AuthApi, UserLoginProps } from "../AuthService";


export function LoginPage() {
    const [viewPassword, setViewPassword] = useState(false)
    const {userData, setUserData} = useUserData()
    const [data, setData] = useState<UserLoginProps>({
        email: '',
        password: ''
    })

    return (
        <>
            <Header />
            <ContainerAuth onSubmit={event => AuthApi(event, data, setUserData)}>
                <Title>
                    S-Shop
                </Title>
                <TextField 
                variant="outlined" 
                required fullWidth 
                type="email" 
                placeholder="Digite seu email" 
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                />

                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type={viewPassword ? "text" : "password"}
                    placeholder="Digite seu password"
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}
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
                <Button type="submit" variant="contained" color="primary">Logar</Button>
                <SubtitleAuth>Não possui conta? <a href="/register">Criar conta!</a></SubtitleAuth>
            </ContainerAuth>
        </>
    )
}