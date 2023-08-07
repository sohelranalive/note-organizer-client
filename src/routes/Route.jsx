import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Registration from "../components/Registration";
import ViewNotes from "../components/ViewNotes";
import Main from "../layouts/Main";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><ViewNotes></ViewNotes></PrivateRoute>,
                loader: ({ params }) => fetch(`https://note-oraganizer-server.vercel.app/note/${params.id}`)
            }
        ]
    }
])

export default router;