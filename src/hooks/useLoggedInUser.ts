import fetcher from "@/libs/fetcher";
import useSwr from "swr";
const useLoggedInUser = () => {
  const { data, error, isLoading, mutate } = useSwr(
    "api/loggedInUser",
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useLoggedInUser;
