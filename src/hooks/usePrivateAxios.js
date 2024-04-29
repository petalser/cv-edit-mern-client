import { privateAxios } from "../api/axios";
import { useEffect, useRef } from "react";
import { useTokenSignal } from "./useTokenSignal";

export const usePrivateAxios = () => {
  const { tokenSignal, setTokenSignal } = useTokenSignal();
  const isRefresh = useRef(false);

  useEffect(() => {
    const reqInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${tokenSignal}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error.config;
        if (error.response?.status === 403 && !isRefresh.current) {
          isRefresh.current = true;

          const newAccessToken = await privateAxios
            .get("/auth/refresh")
            .then((res) => res.data.accessToken);
          console.log("new AT");
          request.headers["Authorization"] = `Bearer ${newAccessToken}`;
          setTokenSignal(newAccessToken);
          return privateAxios(request);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(reqInterceptor);
      privateAxios.interceptors.response.eject(resInterceptor);
    };
  }, [tokenSignal, setTokenSignal]);

  return privateAxios;
};
