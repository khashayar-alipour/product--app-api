import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";
// --------------------------------------------------------------

const useGetProducts= () => {
    const queryFn = (data) => api.get("products?page=1&limit=10", data);

    return useQuery({ queryFn });
  };

  export {useGetProducts}



//   const queryFn = () => {
//     return fetch(api).then(res => res.json())
//   }