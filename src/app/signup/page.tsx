'use client'

import Button from '@mui/material/Button'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import signUp from '@/entities/user/sign-up'
import { useRouter } from 'next/navigation'

type FormValues = {
  email: string
  password: string
}

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<FormValues>()
  const router = useRouter()
  const signUpFunction = signUp
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signUpFunction(data.email, data.password)
      router.push('/api/auth/signin')
    } catch (error) {
      console.error('Error during mutation:', error)
    }
  }
  return (
    <div className="flex h-screen w-full ">
      <div className="m-auto w-96">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold">Регистрация</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-1 flex flex-col gap-5">
              <input
                id="title"
                placeholder="email"
                type="text"
                {...register('email', {
                  required: { value: true, message: 'email is required' },
                })}
                className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
              />

              <input
                id="title"
                placeholder="password"
                type="password"
                {...register('password', {
                  required: { value: true, message: 'email is required' },
                })}
                className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded bg-blue-500 p-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Зарегистрироваться
            </button>
            <div className="mt-5 flex items-center justify-center">
              <Link
                href="/api/auth/signin"
                className="font-bold text-neutral-900"
              >
                <Button variant="outlined">Войти в аккаунт</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
