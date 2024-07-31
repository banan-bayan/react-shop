import { useEffect, useState } from "react";
import { getSize } from "../api/productsData";
import Button from "./UI/Button";
import { Size, ColorProduct } from "../Types";
import { useAppDispatch } from "../hooks";
import { addSizes } from "../store/sizesSlice";
interface ProdColorProps {
  className?: string;
  productColor: ColorProduct;
  productId: number;
  productName: string;
  handlerClick: (
    cartId: string,
    productId: number,
    productColor: ColorProduct,
    chooseSize: Size,
    productName: string
  ) => void;
}

const ProductColor = ({
  productName,
  productColor,
  productId,
  className,
  handlerClick,
}: ProdColorProps) => {
  const dispatch = useAppDispatch();
  const [sizes, setSizes] = useState<Size[]>([]);
  dispatch(addSizes(sizes));
  const [chosenSizeId, setChosenSizeId] = useState<number | null>(null);
  const fetchSize = async () => {
    try {
      const requests = productColor.sizes.map((sizeId) => getSize(sizeId));
      const productSizes = await Promise.all(requests);
      setSizes(productSizes);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchSize();
  }, [productColor.sizes]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSizeId = parseInt(e.target.value);
    setChosenSizeId(selectedSizeId);
  };

  const chooseSize = sizes.find(({ id }) => id === chosenSizeId);
  const cartId = `${productId}${productColor.id}${chosenSizeId}`;

  return (
    <div className={className}>
      <img
        className="product-slider__image"
        src={`${productColor.images[0]}`}
        alt={`Изображение ${productColor.name}`}
      />
      <div className="product-name">{productName}</div>
      <select
        className="select-container"
        onChange={handleSizeChange}
        value={chosenSizeId ?? ""}
      >
        <option value="" disabled className="styled-select">
          выбрать размер
        </option>

        {sizes.map(({ id, label }) => (
          <option key={id} value={id} className="styled-select">
            Размер: {label}
          </option>
        ))}
      </select>
      <Button
        className="btn product-color-card-add-to-cart__button"
        handlerClick={() => {
          if (!chooseSize) return null;
          handlerClick(
            cartId,
            productId,
            productColor,
            chooseSize,
            productName
          );
        }}
      >
        В корзину
      </Button>
    </div>
  );
};

export default ProductColor;
