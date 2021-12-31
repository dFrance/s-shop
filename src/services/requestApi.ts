import { api } from '../config/api'

export default {
    get:(name: string) => {
        return api.get(`/${name}`)
    },
    post:(name: string, data: any) => {
        return api.post(`/${name}`, data)
    },
    delete:(name: string, id: string) => {
        return api.post(`/${name}`, id)
    }
}