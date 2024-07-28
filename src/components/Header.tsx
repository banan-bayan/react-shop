import Button from "./UI/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <Button>list</Button>
      </Link>
      <Link to={"/cart"}>
        <Button>cart</Button>
      </Link>
    </div>
  );
};

export default Header;
