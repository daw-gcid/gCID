import { API_URL } from "@/config/urls";
import axios from "axios";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
