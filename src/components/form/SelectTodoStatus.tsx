import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "@/interfaces/todo.interface";
import { useQueryClient } from "@tanstack/react-query";
import { updateTodoStatus } from "@/services/todosService";
import { CheckCircle, Clock } from "lucide-react";

interface SelectTodoStatusProps {
  todo: Todo;
}

export default function SelectTodoStatus({ todo }: SelectTodoStatusProps) {
  const [status, setStatus] = useState(
    todo.completed ? "completed" : "pending"
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    setStatus(todo.completed ? "completed" : "pending");
  }, [todo.completed]);

  const handleStatusChange = async (value: string) => {
    setStatus(value);
    try {
      await updateTodoStatus(todo.id, value === "completed");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    } catch (error) {
      console.error("Error updating todo status:", error);
      setStatus(todo.completed ? "completed" : "pending");
    }
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccionar estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">
          <div className="flex items-center gap-1">
            <Clock className="text-yellow-400" size={12} />
            <p> Pendiente</p>
          </div>
        </SelectItem>
        <SelectItem value="completed">
          <div className="flex items-center gap-1">
            <CheckCircle className="text-green-400" size={12} />
            <p> Completado</p>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
