import axios, { AxiosRequestConfig } from "axios";
import { MCRM_AXIOS_BASE_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: MCRM_AXIOS_BASE_URL,
});

type UpdateTResponse<T> = {
  data: T;
};

type DeleteTResponse<T> = {
  data: T;
};

type CreateTResponse<T> = {
  data: T;
};

class ApiClient<T, W> {

  constructor(private endpoint: string) { }

  getAll = async (config: AxiosRequestConfig) => {
    try{
      const {data, status } = await axiosInstance.get<W[]>(this.endpoint, config)
      return data as W[];
    }
    catch(err) {
      throw err;
    }
  }

  getOne = async (config: AxiosRequestConfig, id: number): Promise<W> => {
    try{
      const {data, status } = await axiosInstance.get<W>(`${this.endpoint}/${id}`, config);
      return data as W;
    }
    catch(err) {
      throw err;
    }
  }

  post = async (config: AxiosRequestConfig, input: T) => {
    try {
      const { data, status } = await axiosInstance
        .post<CreateTResponse<W>>(this.endpoint, input, config)
      return data as W;
    }
    catch (err) {
      throw err;
    }
  }

  patch = async (config: AxiosRequestConfig, input: T, key: number | string = ''): Promise<W> => {
    try {
      const { data, status } = await axiosInstance
        .patch<UpdateTResponse<W>>(`${this.endpoint}/${key}`, input, config)
      return data as W;
    }
    catch (err) {
      throw err;
    }
  }

  delete = async (config: AxiosRequestConfig, key: number | string): Promise<W> => {
    try {
      const { data, status } = await axiosInstance
        .delete<DeleteTResponse<W>>(`${this.endpoint}/${key}`, config)
      return data as W;
    }
    catch (err) {
      throw err;
    }
  }
}

export default ApiClient;