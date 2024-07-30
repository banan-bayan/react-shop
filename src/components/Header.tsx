import Button from "./UI/Button";
import { Link } from "react-router-dom";
interface HeaderProps {
  cartProductsCount: number
}
const Header = ({cartProductsCount}: HeaderProps) => {

  return (
    <div className="header">
      <Link to={"/"}>
        <Button>Каталог</Button>
      </Link>
      <Link to={"/cart"}>
        <Button>
          <p>{`Корзина   ${cartProductsCount}`}</p>
        </Button>
      </Link>
    </div>
  );
};

export default Header;
