import Button from "./UI/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <Button>Каталог</Button>
      </Link>
      <Link to={"/cart"}>
        <Button>Корзина</Button>
      </Link>
    </div>
  );
};

export default Header;
