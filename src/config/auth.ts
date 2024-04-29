import type { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import ky from 'ky'

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const response = await ky.post(
              'http://localhost:8080/api/auth/signin',
              {
                json: {
                  email: credentials.email,
                  password: credentials.password,
                },
              }
            )

            const data = await response.json()
            console.log('Ответ от сервера:', data)

            console.log('Вход выполнен успешно')

            return data as User
          } catch (error) {
            console.error('Ошибка при входе:', error)
            throw new Error('Неверные учетные данные') // Возвращаем ошибку, если произошла ошибка во время аутентификации
          }
        }
        return null
      },
    }),
  ],
}
