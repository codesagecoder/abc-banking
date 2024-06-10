'use server'

import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { authFormValidator } from "../validators/auth-form";

// Pick<TAuthFormValidator, 'password' | 'email'>
export const SignIn = async (payload: unknown) => {
  const safe = authFormValidator('sign-in').safeParse(payload);

  if (!safe.success) return null;

  return null;
};

// Required<TAuthFormValidator>
export const SignUp = async (payload: unknown) => {
  try {
    const safe = authFormValidator('sign-up').safeParse(payload);

    if (!safe.success) throw new Error('Validation failed');

    const { email, firstName, lastName, password } = safe.data;

    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error('Error creating user');

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch {
    return null;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    return parseStringify(user);
  } catch {
    return null;
  }
}
