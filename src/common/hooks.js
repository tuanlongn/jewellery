import { useState, useMemo } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import useSWR from "swr";
//-----------------------------------------------

export const useLocalStorage = (key, initialValue) => {
  const [storeValue, setStoreValue] = useState(() => {
    try {
      let value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value) || initialValue;
      } else return initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setValue = (data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      setStoreValue(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleStorageEvent = useCallback((event) => {
    if (event.key === key && event.newValue !== storeValue) {
      setStoreValue(event.newValue);
    }
  });

  useEffect(() => {
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, [handleStorageEvent]);

  return [storeValue, setValue];
};

//----------
// SWR

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
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(() => {
    let query = "";
    // filters
    Object.keys(filters).forEach((key) => {
      if (query) {
        query += "&";
      }
      if (filters[key]?.length > 0) {
        query += `${key}=${filters[key].join(",")}`;
      }
    });

    // page
    if (query) {
      query += "&";
    }
    query += `page=${page}`;

    return `/api/products?${query}`;
  }, fetcher);

  return {
    filters,
    setFilters,
    setPage,
    products: data?.data,
    pagination: data?.pagination,
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
