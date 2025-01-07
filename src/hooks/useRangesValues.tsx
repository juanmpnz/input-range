import { useQuery } from "@tanstack/react-query";

const useRangesValues = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["values"],
    queryFn: () =>
      fetch("https://demo6445295.mockable.io/ranges").then((res) => res.json()),
    staleTime: Infinity,
  });

  return {
    isLoading,
    error,
    data,
  };
};
export default useRangesValues;
