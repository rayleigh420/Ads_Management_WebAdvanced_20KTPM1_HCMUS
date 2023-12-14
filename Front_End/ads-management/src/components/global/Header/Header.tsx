import { Button } from "antd";
import "./Header.scss"
import { Link } from "react-router-dom";

const Header = () => {
    return <div className="flex items-center justify-between w-full">
        <Link to="/">
            <img src="https://inhoangha.com/uploads/logo-starbucks.jpg" className="w-50 h-20 cursor-pointer"></img>
        </Link>
        <div className="flex items-center gap-4">
            <Button size="large" href="/">Login</Button>
        </div>
    </div>;
}

export default Header