import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from './auth-hook';
import any = jasmine.any;

/**
 * Returns an authorizated axios instance
 *
 * @param {Object} config is the default config to be sent to the axios creator
 *
 * @return {Object} an object containing the axios instance and the initialized prop
 *
 */
export const useAxios = (config:any) => {
    const { token, initialized: authInitialized } = useAuth();

    const [initialized, setInitialized] = useState(false);
    const [axiosInstance, setAxiosInstance] = useState<any>({});

    useEffect(() => {
        const instance = axios.create({
            ...config,
            headers: {
                ...(config.headers || {}),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: authInitialized ? `Bearer ${token}` : undefined,
            },
        });

        setAxiosInstance({ instance });
        setInitialized(true);

        return () => {
            setAxiosInstance({});
            setInitialized(false);
        };
    }, [token, authInitialized]);

    return { axios: axiosInstance.instance, initialized };
};

export default { useAxios };