"use client"

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SignIn, SignUp } from "@/lib/actions/user.actions";
import { TAuthFormValidator, authFormValidator } from "@/lib/validators/auth-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";

const AuthForm = ({ type }: { type: authType }) => {
  const [user, setUser] = useState<Awaited<ReturnType<typeof SignUp>>>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<TAuthFormValidator>({
    resolver: zodResolver(authFormValidator(type)),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: TAuthFormValidator) => {
    setIsLoading(true);

    try {
      // signup appwrite & create plaid token

      if (type === 'sign-up') {
        const newUser = await SignUp(values);

        setUser(newUser);
      } else {
        const response = await SignIn({ email: values.email, password: values.password });
      }
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href='/' className="cursor-pointer flex items-center gap-1">
          <Image
            src='/icons/logo.svg'
            alt="horixon logo"
            width={34}
            height={34}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : isSignIn ? 'Sign In' : 'Sign Up'}

            <p className="text-16 font-normal text-gray-600">
              {user ? 'Link your account to get started' : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                  </div>
                  <CustomInput control={form.control} name="address" label="Address" placeholder="Enter your address" />
                  <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="state" label="State" placeholder="Example: NY" />
                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 11101" />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />
              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              <Button className="form-btn w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                  </>
                ) : isSignIn ? 'Sign in' : 'Sign up'}
              </Button>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="form-link">
              {isSignIn ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm;