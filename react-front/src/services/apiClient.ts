import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

class ApiClient<T> {
  constructor(private endpoint: string) {}

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance.get<T[]>(this.endpoint, config)
      .then(res => res.data)
      .catch(err => err);
  }

  getOne = (config: AxiosRequestConfig, id: number) => {
    return axiosInstance.get<T>(`${this.endpoint}/${id}`, config)  
      .then(res => res.data)
      .catch(err => err);
  }

  post = (config: AxiosRequestConfig, data: Partial<T>) => {
    return axiosInstance
      .post<Partial<T>>(this.endpoint, data, config)
      .then(res => res.data)
      .catch(err => err);
  }

  patch = (config: AxiosRequestConfig, data: Partial<T>, id: number) : Promise<Partial<T>> => {
    return axiosInstance
      .patch<Partial<T>>(`${this.endpoint}/${id}`, data, config)
      .then(res => res.data)
      .catch(err => err);
  }
}

export default ApiClient;