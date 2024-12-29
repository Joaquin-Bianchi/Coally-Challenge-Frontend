import { motion, AnimatePresence } from "framer-motion";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import { ActionModal } from "@/components/modal/ActionModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, CheckCircle } from "lucide-react";
import { Todo } from "@/interfaces/todo.interface";
import { deleteTodoById } from "@/services/todosService";
import SelectTodoStatus from "@/components/form/SelectTodoStatus";
import EditTodoForm from "../forms/EditTodoForm";

interface Props {
  todos?: Todo[];
}

function TodosTable({ todos }: Props) {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Tarea</TableHead>
            <TableHead className="w-[50%]">Descripcion</TableHead>
            <TableHead className="w-[30%]">Estado</TableHead>
            <TableHead className="w-[20%] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {todos?.map((todo) => (
              <motion.tr
                key={todo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                layout
                className={`${
                  todo.completed ? "bg-green-50 dark:bg-green-900/20" : ""
                }`}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <AnimatePresence>
                      {todo.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span
                      className={
                        todo.completed ? "line-through text-gray-500" : ""
                      }
                    >
                      {todo.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-gray-500 dark:text-gray-400">
                    {todo.description}
                  </div>
                </TableCell>
                <TableCell>
                  <SelectTodoStatus todo={todo} />
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:scale-125 transition-all duration-200 rounded-full ">
                        <Ellipsis className="h-5 w-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="flex flex-col gap-2">
                        <ActionModal title="Editar" dialogTitle="Editar Tarea">
                          <EditTodoForm todo={todo} />
                        </ActionModal>
                        <ButtonDelete
                          id={todo.id}
                          deleteFn={deleteTodoById}
                          nameMutationKey="deleteTodo"
                          nameQueryKey="todos"
                          textObjectDelete="todos"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}

export default TodosTable;
