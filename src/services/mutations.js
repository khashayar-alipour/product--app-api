import { useMutation } from "@tanstack/react-query";

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
  const mutationFn = (data) => api.post("products", data);

  return useMutation({ mutationFn });
}

//-----------------------------------------------------------------------

const useUpdate = () => {
  const mutationFn = (data) => api.put(`products/${data.id}`, data);
  return useMutation({ mutationFn });
}

// -----------------------------------------------------------------------

const useDelete = () => {
  const mutationFn = (data) => api.delete(`products/${data.id}`, data);
  return useMutation({ mutationFn });
}

// -----------------------------------------------------------------------

export { useRegister, useLogin,usePost ,useUpdate, useDelete};
