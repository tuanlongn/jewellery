import { useState, useEffect, useMemo, useCallback } from "react";
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

export const useCart = () => {
  const initialValue = { items: {} };
  const [cart, setCartValue] = useLocalStorage("cart", initialValue);

  const items = useMemo(() => {
    if (cart?.items) {
      return Object.values(cart.items);
    }
    return [];
  }, [cart]);

  const addItem = (item, quantity) => {
    const _cart = { ...cart };
    if (_cart.items[item.id]) {
      _cart.items[item.id].quantity += quantity;
    } else {
      _cart.items[item.id] = {
        ...item,
        quantity: quantity,
      };
    }
    setCartValue(_cart);
  };

  const updateItem = (pid, quantity) => {
    const _cart = { ...cart };
    // change
    if (quantity > 0) {
      _cart.items[pid].quantity = quantity;
    }
    // remove item
    if (quantity === 0) {
      delete _cart.items[pid];
    }
    setCartValue(_cart);
  };

  const removeItem = (pid) => {
    const _cart = { ...cart };
    if (_cart.items[pid]) {
      delete _cart.items[pid];
      setCartValue(_cart);
    }
  };

  const clear = () => {
    setCartValue(initialValue);
  };

  const selectAddress = (adr) => {
    const _cart = { ...cart };
    _cart.address = adr;
    setCartValue(_cart);
  };

  return {
    items,
    addItem,
    updateItem,
    removeItem,
    clear,
    address: cart.address,
    selectAddress,
  };
};

export const useAddress = () => {
  const [addresses, setAddressValue] = useLocalStorage("addresses", []);

  const addAddress = (value) => {
    const _addresses = [...addresses];
    _addresses.push(value);
    console.log("addAddress", _addresses);
    setAddressValue(_addresses);
  };

  const updateAddress = (index, value) => {
    const _addresses = [...addresses];
    if (_addresses[index]) {
      _addresses[index] = value;
      setAddressValue(_addresses);
    }
  };

  const removeAddress = (index) => {
    const _addresses = [...addresses];
    if (_addresses[index]) {
      _addresses.splice(index, 1);
      setAddressValue(_addresses);
    }
  };

  return {
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
  };
};

export const useRegion = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const { data: provinceRes, isValidating: isValidatingProvince } = useSWR(
    () => `${process.env.NEXT_PUBLIC_HOST}/api/regions?type=province`,
    fetcher
  );

  const { data: districtRes, isValidating: isValidatingDistrict } = useSWR(
    () =>
      selectedProvince
        ? `${process.env.NEXT_PUBLIC_HOST}/api/regions?type=district&parent_code=${selectedProvince}`
        : null,
    fetcher
  );

  const { data: wardRes, isValidating: isValidatingWard } = useSWR(
    () =>
      selectedDistrict
        ? `${process.env.NEXT_PUBLIC_HOST}/api/regions?type=ward&parent_code=${selectedDistrict}`
        : null,
    fetcher
  );

  const provinces = useMemo(() => {
    if (provinceRes) {
      return provinceRes.sort((a, b) => a.name.localeCompare(b.name));
    }
    return [];
  }, [provinceRes]);

  const districts = useMemo(() => {
    if (districtRes) {
      return districtRes.sort((a, b) => a.name.localeCompare(b.name));
    }
    return [];
  }, [districtRes]);

  const wards = useMemo(() => {
    if (wardRes) {
      return wardRes.sort((a, b) => a.name.localeCompare(b.name));
    }
    return [];
  }, [wardRes]);

  return {
    provinces,
    districts,
    wards,
    setSelectedProvince,
    setSelectedDistrict,
    isLoadingProvinceData: isValidatingProvince,
    isLoadingDistrictData: isValidatingDistrict,
    isLoadingWardData: isValidatingWard,
  };
};
