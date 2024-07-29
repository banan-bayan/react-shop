import Button from "./UI/Button";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
const Header = () => {
  const cart = useAppSelector(state => state.cart)

  return (
    <div className="header">
      <Link to={"/"}>
        <Button>Каталог</Button>
      </Link>
      <Link to={"/cart"}>
        <Button><p>{`Корзина   ${cart.length}`}</p></Button>
      </Link>
    </div>
  );
};

export default Header;
