import { Navigate, Route,Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import { HomePage } from "./pages/HomePage"

export const AppRouter = ()=>{
    return (
        <Routes>
            <Route path={'/'} element={<Layout><HomePage /></Layout>} />
            <Route path={'/user-profile'} element={<span>User Profile</span>} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
        </Routes>
    )
}