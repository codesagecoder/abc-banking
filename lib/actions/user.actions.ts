'use server'

import { authFormValidator } from "../validators/auth-form";

// Pick<TAuthFormValidator, 'password' | 'email'>
export const SignIn = async (payload: unknown) => {
  const safe = authFormValidator('sign-in').safeParse(payload);

  if (!safe.success) return null;

  return null;
};

// Required<TAuthFormValidator>
export const SignUp = async (payload: unknown) => {
  const safe = authFormValidator('sign-up').safeParse(payload);

  if (!safe.success) return null;

  return null;
};
