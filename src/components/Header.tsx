import Button from "./UI/Button";
import { Link } from "react-router-dom";
interface HeaderProps {
  cartProductsCount: number
}
const Header = ({cartProductsCount}: HeaderProps) => {

  return (
    <div className="header">
      <div className="header__nav-buttons">
      <Link to={"/"}>
        <Button className="btn header__button">Каталог</Button>
      </Link>
      <Link to={"/cart"}>
        <Button className="btn header__button">
          <p>{`Корзина   ${cartProductsCount}`}</p>
        </Button>
      </Link>
      </div>
    </div>
  );
};

export default Header;
