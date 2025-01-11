import axios, {
    Axios,
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig,
    isAxiosError,
} from 'axios';
import { store } from '../redux/store';
import { inValidateUser } from '../redux/slices/storage';
import { logoutReset } from '../redux/slices/filter';
import { ResponseDataStructure } from '../shared/constants';

const handleLogoutClearState = () => {
    store.dispatch(inValidateUser());
    store.dispatch(logoutReset());
    history.replaceState(null, '', '/login');
};

const errorStatusHandler = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response: AxiosResponse<ResponseDataStructure>) => response,
        (error: AxiosError<ResponseDataStructure>) => {
            if (isAxiosError(error) && error.response) {
                const { status } = error.response;
                switch (status) {
                    case 401:
                        handleLogoutClearState();
                        break;

                    default:
                        break;
                }
            }
            return Promise.reject(error);
        }
    );
    return instance;
};

const createInstance = () => {
    const instance = axios.create({
        withCredentials: true,
        baseURL: import.meta.env.VITE_SERVER,
        headers: { 'Content-Type': 'application/json' },
    });
    return errorStatusHandler(instance);
};

export { Axios, AxiosError, isAxiosError };
export type { AxiosResponse };

export const getRequest = async (
    url: string,
    config?: AxiosRequestConfig<unknown>
) => createInstance().get(url, config);

export const postRequest = async (
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown>
) => createInstance().post(url, data, config);

export const putRequest = async (
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown>
) => createInstance().put(url, data, config);

export const patchRequest = async (
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown>
) => createInstance().patch(url, data, config);

export const deleteRequest = async (
    url: string,
    config?: AxiosRequestConfig<unknown>
) => createInstance().delete(url, config);
