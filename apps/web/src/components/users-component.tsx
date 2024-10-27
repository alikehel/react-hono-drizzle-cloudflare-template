import { api } from "./lib/api-client";

export const UsersComponent = () => {
    const { data, error, isLoading } = api.useQuery("get", "/api/v1/users", {
        params: {
            query: {
                name: "dfs",
            },
        },
    });

    if (isLoading || !data) return "Loading...";

    if (error) return `An error occured: ${error.message}`;

    return (
        <div>
            <h1>Users</h1>
            {data.data.map((user) => (
                <p key={user.id}>
                    {user.name} - {user.email}
                </p>
            ))}
        </div>
    );
};
