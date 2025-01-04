import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        // path: "/",
        // element: <Root />,
        // children: [
        //     {
        //         path: "auth",
        //         element: <AuthLayout />,
        //         children: [
        //             {
        //                 path: "login",
        //                 element: <LoginPage />
        //             }
        //         ]
        //     }
        // ]
    }
]);

export const ApplicationRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};