import { useCallback, useEffect, useState } from "react";
import useAxios from "../useHooks/useAxios";
import { BankVerification } from "../types/apiData/banks";

//axios instace interceptor for access token integration and refresh tokens
export default function useVerifyBank({
  bankCode,
  accountNumber,
}: {
  bankCode: string;
  accountNumber: string;
}) {
  const axios = useAxios({ disableSuccMssg: false, disableErrMssg: false });
  const [data, setData] = useState<BankVerification>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const verifyBank = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.post(`/admin/booking/verify-bank-account`, {
        bank_code: bankCode,
        account_number: accountNumber,
      });
      const verification = response?.data?.data;
      setData(verification);
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [bankCode, accountNumber]);

  useEffect(() => {
    if (bankCode && accountNumber && accountNumber.length === 10) {
      verifyBank();
    }
  }, [bankCode, accountNumber]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: verifyBank,
  };
}
