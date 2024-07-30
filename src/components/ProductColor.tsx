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
  handlerClick: (
    cartId: string,
    productId: number,
    productColor: ColorProduct,
    chooseSize: Size
  ) => void;
}

const ProductColor = ({
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
        className="product-color__img"
        src={`${productColor.images[0]}`}
        alt={`Изображение ${productColor.name}`}
      />

      <select
        className="select-size"
        onChange={handleSizeChange}
        value={chosenSizeId ?? ""}
      >
        <option value="" disabled>
          выбрать размер
        </option>

        {sizes.map(({ id, label }) => (
          <option key={id} value={id} className="option-size">
            Размер: {label}
          </option>
        ))}
      </select>
      <Button
        className="product-color__button"
        handlerClick={() => {
          if (!chooseSize) return null;
          handlerClick(cartId, productId, productColor, chooseSize);
        }}
      >
        В корзину
      </Button>
    </div>
  );
};

export default ProductColor;
