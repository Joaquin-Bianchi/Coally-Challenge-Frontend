import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { InfoIcon, ListTodo } from "lucide-react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "test@test.com",
      password: "123456",
    },
  });
  let navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInputs) => login(data.email, data.password),
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(`Error en el inicio de sesión: ${error.message}`);
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <ListTodo className="h-6 w-6 text-primary" />
            <CardTitle className="text-3xl font-bold">Task Manager</CardTitle>
          </div>
          <CardDescription className="text-center">
            Inicia sesión para gestionar tus tareas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              label="Correo Electrónico"
              control={control}
              rules={{ required: "El correo electrónico es obligatorio" }}
              placeholder="Ingresa tu correo electrónico"
              type="email"
            />
            <FormField
              name="password"
              label="Contraseña"
              control={control}
              rules={{ required: "La contraseña es obligatoria" }}
              placeholder="Ingresa tu contraseña"
              type="password"
            />
          </form>
          <div className="bg-sky-600 mt-10 flex justify-center items-center gap-2 font-bold text-white  py-1 text-sm m-auto rounded-md">
            <InfoIcon size={15} /> Datos para probar la aplicacion
          </div>
        </CardContent>
        {loginMutation.isError && (
          <div className="mt-2 p-2 flex justify-center bg-destructive/10 text-red-500 text-sm rounded-md">
            Error: {loginMutation.error.message}
          </div>
        )}
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
