import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";
// --------------------------------------------------------------

const useGetAllProducts= (page) => {
    const queryFn = (data) => api.get(`products?page=${page}&limit=10`, data);
    // queryFn bayad besurate ye arrow function bashe ke natijash return mishe
    const queryKey = ["all-products", page]

    return useQuery({ queryFn, queryKey });
  };

  export {useGetAllProducts}
