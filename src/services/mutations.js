import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../configs/api";

// ----------------------------------------------------------------------

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);

  return useMutation({ mutationFn });
};
//-----------------------------------------------------------------------

const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);

  return useMutation({ mutationFn });
};
//-----------------------------------------------------------------------

const usePost = () => {
  const queryClient = useQueryClient()
  const mutationFn = (data) => api.post("products", data);

  const onSuccess = async () => { await queryClient.invalidateQueries({queryKey : ["all-products"] }) }
  // onSuccess ro inja tuye hook neveshtim ke az tekrare code dar component ha jologiri beshe
  // hamchenin besurate async neveshtim chon onSuccess byd besurate promise return beshe inja(tebghe gofteye API doc)

  return useMutation({ mutationFn, onSuccess });
}

//-----------------------------------------------------------------------

const useUpdate = () => {
  const queryClient = useQueryClient()

  const mutationFn = (data) => api.put(`products/${data.ids}`, data);
  // in data hamun product hast ke be mutate function khodemon midim

  const onSuccess = async () => { await queryClient.invalidateQueries({queryKey : ["all-products"] }) }

  return useMutation({ mutationFn, onSuccess });
}

// -----------------------------------------------------------------------

const useDelete = () => {
  const queryClient = useQueryClient()

  const mutationFn = (data) => api.delete("products", data);
  // dar component deleteModal umadim id ro dar ghalebe {data} be akhare rndpoint "products" ezafe keepPreviousDatam

  const onSuccess = async () => { await queryClient.invalidateQueries({queryKey : ["all-products"] }) }

  return useMutation({ mutationFn, onSuccess });
}

// -----------------------------------------------------------------------

export { useRegister, useLogin,usePost ,useUpdate, useDelete};
