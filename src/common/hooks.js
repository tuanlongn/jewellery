import { useState, useMemo } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import useSWR from "swr";
//-----------------------------------------------

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useProduct = (id) => {
  const { data, error } = useSWR(`/api/product/${id}`, fetcher);

  return {
    product: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFilterProducts = () => {
  const [filters, setFilters] = useState({});

  const { data, error } = useSWR(() => {
    let query = "";
    Object.keys(filters).forEach((key) => {
      if (query) {
        query += "&";
      }
      if (filters[key]?.length > 0) {
        query += `${key}=${filters[key].join(",")}`;
      }
    });
    return `/api/products?${query}`;
  }, fetcher);

  return {
    filters,
    setFilters,
    products: data?.data,
    isLoading: !error && !data,
  };
};

export const useContainerSize = () => {
  const breakpoints = useBreakpoint();

  const width = useMemo(() => {
    if (breakpoints.lg) {
      return 1200;
    }
    return "100%";
  }, [breakpoints]);

  return { breakpoints, width };
};
