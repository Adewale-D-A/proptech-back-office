import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { updateResources } from "../stores/apiData/resources";
import useAxios from "../useHooks/useAxios";
import reformResources from "../utils/admin/reformResource";

//axios instace interceptor for access token integration and refresh tokens
export default function useGetAllResources() {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const dispatch = useAppDispatch();
  const { status, reformedData } = useAppSelector(
    (state) => state.resources.value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getAllAdmins = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/admin/permissions`);
      const { permissions } = response?.data?.data;
      const result = reformResources({ resource: permissions });
      dispatch(updateResources({ rawdata: permissions, reformedData: result }));
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!status) {
      getAllAdmins();
    }
  }, [status]);

  return {
    data: reformedData,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAllAdmins,
  };
}
