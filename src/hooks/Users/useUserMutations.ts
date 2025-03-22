import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, deleteUser, updateUser } from "@/services/userService";
import { User, AddUserRequest } from "@/types/user";

export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, AddUserRequest>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, Partial<User> & { id_user: number }>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
