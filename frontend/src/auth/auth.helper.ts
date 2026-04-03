/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "../store/api/auth";
import { clearCredentials, setCredentials } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const registerSchema = z.object({
  name: z.string().min(3, { error: "Name should have at least 3 letters" }),
  email: z.email({ error: "Invalid email" }),
  password: z
    .string()
    .min(4, { error: "Password needs to be more than 4 charcters long" }),
});

export function useRegisterForm() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: zod4Resolver(registerSchema),
  });

  const dispatch = useAppDispatch();
  const [register, { isLoading, isError }] = useRegisterMutation();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await register(values).unwrap();
      dispatch(setCredentials(res.user));
      // biome-ignore lint/suspicious/noExplicitAny: hard to type
    } catch (error: any) {
      toast.error(error.error.message || "Failed to register");
    }
  };

  return { form, handleSubmit, isLoading, isError };
}

const loginSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z
    .string()
    .min(4, { error: "Password needs to be more than 4 charcters long" }),
});

export function useLoginForm() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zod4Resolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials(res.user));
      // biome-ignore lint/suspicious/noExplicitAny: hard to type
    } catch (error: any) {
      toast.error(error.error.message || "Failed to login");
    }
  };

  return { form, handleSubmit, isLoading, isError };
}

export function useRedirectToHome() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
}

export function useLogout() {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  return {
    logout: () => {
      logout({});
      dispatch(clearCredentials());
    },
  };
}
