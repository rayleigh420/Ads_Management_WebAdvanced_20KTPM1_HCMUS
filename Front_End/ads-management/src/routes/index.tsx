import {
    Route,
    Routes
} from "react-router-dom";
import Home from "../pages";
import NotFound from "../pages/NotFound";

export const RouterProvider = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}
