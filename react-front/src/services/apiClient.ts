import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

type UpdateTResponse<T> = {
  data: T;
};

type CreateTResponse<T> = {
  data: T;
};

class ApiClient<T> {
  
  constructor(private endpoint: string) { }

  getAll = async (config: AxiosRequestConfig) => {
    try{
      const {data, status } = await axiosInstance.get<T[]>(this.endpoint, config)
      return data as T[];
    }
    catch(err) {
      throw err;
    }
  }

  getOne = async (config: AxiosRequestConfig, id: number): Promise<T> => {
    try{
      const {data, status } = await axiosInstance.get<T>(`${this.endpoint}/${id}`, config);
      return data as T;
    }
    catch(err) {
      throw err;
    }
  }

  post = async (config: AxiosRequestConfig, input: T) => {
    try {
      const { data, status } = await axiosInstance
        .patch<CreateTResponse<T>>(this.endpoint, input, config)
      return data as T;
    }
    catch (err) {
      throw err;
    }
  }

  patch = async (config: AxiosRequestConfig, input: T, id: number): Promise<T> => {
    try {
      const { data, status } = await axiosInstance
        .patch<UpdateTResponse<T>>(`${this.endpoint}/${id}`, input, config)
      return data as T;
    }
    catch (err) {
      throw err;
    }
  }
}

export default ApiClient;