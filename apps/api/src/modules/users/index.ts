import { createUser } from "./create-user";
import { deleteUser } from "./delete-user";
import { getUser } from "./get-user";
import { getUsers } from "./get-users";
import { updateUser } from "./update-user";

export const usersRoutes = [
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
];
