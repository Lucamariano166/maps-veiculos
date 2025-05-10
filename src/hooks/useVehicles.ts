import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VehiclesData } from "../types/types";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0MTVmOWE3LTk0ZmEtNDBmYy04Nzc3LWU3YTMxNzVjYmYwZCIsIm5hbWUiOiJJc2FiZWxsaSBOYXZhcnJvIiwiZG9jdW1lbnQiOiIzNTgwNzI0NTI1MyIsImVtYWlsIjoidGVzdGVAdHJhLmNvbSIsInBob25lIjoiMTE5Nzc4OTY1NDMiLCJzdGF0dXMiOiJhY3RpdmUiLCJpc01hc3RlciI6dHJ1ZSwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9jbmQtdHJ1Y2tlcnBheS5zZm8zLmRpZ2l0YWxvY2VhbnNwYWNlcy5jb20vcm90b2dyYW1hLzZlOWFjYjIxMWI4NTFjYjBiMGZiZGNkMTVjZTFiODFjLndlYnAiLCJjb3Jwb3JhdGVJZCI6IjEzM2MzZWVlLTA2NDktNDY1Yi1hZWUyLWQ1N2FjZjViNWIyZiIsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTFUMTM6MDA6MjMuNjk3WiIsInBlcm1pc3Npb25zIjpbImRyaXZlci1saW5rLWRlbGV0ZSIsImRhc2hib2FyZCIsImRyaXZlciIsImRyaXZlci1yZWdpc3RyYXRpb25zLWludml0ZSIsImRyaXZlci11bmxpbmsiLCJkcml2ZXItbGluay1jcmVhdGUiLCJkcml2ZXItbGluay1lZGl0IiwidmVoaWNsZS1yZWdpc3RyYXRpb25zIiwidmVoaWNsZS1yZWdpc3RyYXRpb25zLXZpZXciLCJ2ZWhpY2xlLXJlZ2lzdHJhdGlvbnMtZWRpdCIsInZlaGljbGUtcmVnaXN0cmF0aW9ucy1yZWdpc3RlciIsInZlaGljbGUtcmVnaXN0cmF0aW9ucy1kZWxldGUiLCJwbGFjZXMiLCJwbGFjZXMtdmlldyIsInBsYWNlcy1lZGl0IiwicGxhY2VzLXJlZ2lzdGVyIiwicGxhY2VzLWRlbGV0ZSIsInJvdXRlcyIsInJvdXRlcy1yZWdpc3RlciIsInJvdXRlcy1kZWxldGUiLCJyb3V0ZXMtZWRpdCIsInJvdXRlcy12aWV3IiwidHJpcHMiLCJ0cmlwcy12aWV3IiwidHJpcHMtY2FuY2VsIiwidHJpcHMtZWRpdCIsInRyaXBzLWRlbGV0ZSIsInRyaXBzLWNoYXQiLCJyZXBvcnRzIiwicmVwb3J0cy12aWV3IiwicmVwb3J0cy1kb3dubG9hZCIsImFsZXJ0LWNvbmZpZ3VyYXRpb24iLCJhbGVydC1jb25maWd1cmF0aW9uLXZpZXciLCJvcGVyYXRvcnMiLCJvcGVyYXRvcnMtY3JlYXRlIiwib3BlcmF0b3JzLXZpZXciLCJhbGVydHMiLCJhbGVydHMtdmlldyIsIm9wZXJhdG9ycy1lZGl0Iiwib3BlcmF0b3JzLWRlbGV0ZSIsInBlcm1pc3Npb25zIiwicGVybWlzc2lvbnMtdmlldyIsInBlcm1pc3Npb25zLWVkaXQiLCJwZXJtaXNzaW9ucy1kZWxldGUiLCJwZXJtaXNzaW9ucy1jcmVhdGUiLCJpcy1jYXJyaWVyIiwidHJpcHMtY3JlYXRlIiwiY2hlY2tsaXN0IiwiY2hlY2tsaXN0LXZpZXciLCJjaGVja2xpc3QtdG8tY29tcGxldGUiXSwiaWF0IjoxNzQ2NTg0NTEyLCJleHAiOjE3NDc0NDg1MTJ9.qFYx9A8CDyvnYQlKItnaAsfulDhdE2aWeaTAoycS-yY"; // Substitua com o valor correto

const fetchVehicles = async (
    type: string,
    page: number,
    perPage: number = 10,
    plate?: string,
    fleet?: string
): Promise<VehiclesData> => {
    const validTypes = ["tracked", "others"];
    const currentType = validTypes.includes(type) ? type : "tracked";

    try {
        const response = await axios.get(
            "https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate",
            {
                params: {
                    type: currentType,
                    page,
                    perPage,
                    plate: plate?.trim() || undefined,
                    fleet: fleet?.trim() || undefined,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*",
                },
            }
        );
        console.log("Resposta da API:", response.data.content);
        return response.data.content;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erro na requisição:", error.response?.data);
            throw new Error(error.response?.data || "Erro desconhecido");
        } else {
            console.error("Erro desconhecido", error);
            throw error;
        }
    }
};

export const useVehicles = (
    type: string,
    page: number,
    perPage: number,
    plate: string,
    fleet: string
) => {
    return useQuery({
        queryKey: ["vehicles", type, page, perPage, plate, fleet],
        queryFn: () => fetchVehicles(type, page, perPage, plate, fleet),
        
    });
};

export default useVehicles;
