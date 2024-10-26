import { createRouter } from "@/lib/create-app";
import { createUserHandler, createUserRoute } from "./create-user";
import { deleteUserHandler, deleteUserRoute } from "./delete-user";
import { getUserHandler, getUserRoute } from "./get-user";
import { getUsersHandler, getUsersRoute } from "./get-users";
import { updateUserHandler, updateUserRoute } from "./update-user";

// export const usersRoutes = [
//     createUser,
//     updateUser,
//     getUsers,
//     getUser,
//     deleteUser,
// ];

export const usersRoutes = createRouter()
    .openapi(getUsersRoute, getUsersHandler)
    .openapi(getUserRoute, getUserHandler)
    .openapi(createUserRoute, createUserHandler)
    .openapi(updateUserRoute, updateUserHandler)
    .openapi(deleteUserRoute, deleteUserHandler);
