import axios from "axios";
import { IDotDto } from "../Models/DotModels";

export default class DotService {

    static async getAll(): Promise<IDotDto[] | null> {
        try {
            const getResult = await axios.get<IDotDto[]>("https://localhost:5001/api/dot")
            return getResult.data
        }
        catch (err: any) {
            console.log(err)
            return null
        }
    }

    static async update(data: IDotDto): Promise<string | null> {
        try {
            await axios.put(`https://localhost:5001/api/dot`, data)
            return null
        }
        catch (err: any) {
            return "Неизвестная ошибка"
        }
    }

    static async delete(id: number): Promise<string | null> {
        try {
            await axios.delete(`https://localhost:5001/api/dot/${id}`)
            return null
        }
        catch (err: any) {
            return "Неизвестная ошибка"
        }
    }
}