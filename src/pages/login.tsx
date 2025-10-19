import { useNavigate } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { useAppForm } from '@/shared/hooks/form.ts'
import { loginSchema, useLogin } from '@/modules/auth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { handleLogin, isPending } = useLogin({
    onSuccess: () => {
      navigate({
        to: '/admin/dashboard',
      })
    },
  })
  const form = useAppForm({
    validators: {
      onSubmit: loginSchema,
    },
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      handleLogin(value)
    },
  })
  return (
    <div className="flex w-full min-h-[100svh] h-full justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <Card className="min-w-[350px]">
          <CardHeader>
            <CardTitle>Вхід</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <form.AppField
                name="email"
                children={(field) => (
                  <field.TextField
                    label="Email"
                    placeholder="Email"
                    type="email"
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <form.AppField
                name="password"
                children={(field) => (
                  <field.TextField
                    label="Пароль"
                    placeholder="Пароль"
                    type="password"
                  />
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" isLoading={isPending}>
              Увійти
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
