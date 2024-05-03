import { toast } from 'sonner'

const signUp = async (email: string, password: string) => {
  const body = JSON.stringify({
    email,
    password,
    role: 'USER',
  })
  const response = await fetch(`http://localhost:8080/api/auth/signup`, {
    body,
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json', // Указываем правильный заголовок Content-Type
    },
  })
  if (!response.ok) {
    if (response.status === 400)
      return { failure: 'Error: Check the correctness of the data' }
    return { failure: `Unexpected error: Try again` }
  }
  toast('Вы успешно зарегестрированы!')
  return response
}

export default signUp
