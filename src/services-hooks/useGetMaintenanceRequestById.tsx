import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { maintenanceRequestsById } from "../types/apiData/maintenance-request";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetMaintenanceRequestById({ id }: { id?: string }) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<maintenanceRequestsById>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getMaintenanceRequestById = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/maintenance-request/${id}`);
      const { maintenance_request } = response?.data?.data;
      setData(maintenance_request);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getMaintenanceRequestById();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getMaintenanceRequestById,
  };
}
