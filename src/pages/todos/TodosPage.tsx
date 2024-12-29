import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ActionModal } from "@/components/modal/ActionModal";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTodos } from "@/services/todosService";
import { Todo } from "@/interfaces/todo.interface";
import TodosTable from "./components/table/TodosTable";
import CreateTodoForm from "./components/forms/CreateTodoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, Filter } from "lucide-react";
import { LoadingState } from "./components/loading/LoadingState";
import ErrorState from "@/components/error/ErrorState";

export default function TodosPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, isError, error } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;

  const filteredTodos =
    statusFilter === "all"
      ? data
      : data?.filter((todo) => {
          if (statusFilter === "pending") return !todo.completed;
          return todo.completed;
        });

  return (
    <div className="min-h-screen bg-secondary/20">
      <main className="container mx-auto py-0 px-0 sm:px-6 sm:py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              <ListTodo className="mr-2 h-6 w-6 inline-block" />
              Organiza tus Tareas
            </CardTitle>
            <ActionModal title="+ Nueva Tarea" dialogTitle="Crear Nueva tarea">
              <CreateTodoForm />
            </ActionModal>
          </CardHeader>
          {data?.length === 0 ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <ListTodo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  No hay Tareas
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Comienza agregando una nueva tarea.
                </p>
              </div>
            </div>
          ) : (
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Filter className="h-5 w-5 text-gray-500" />
                <Label htmlFor="filter" className="text-sm font-medium">
                  Filtrar por estado:
                </Label>
                <Select value={statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger id="filter" className="w-[180px]">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="completed">Completado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <TodosTable todos={filteredTodos} />
            </CardContent>
          )}
        </Card>
      </main>
    </div>
  );
}
