import { useEffect, useState } from "react";
import { getSize } from "../api/productsData";
import Button from "./UI/Button";
import { Size, ColorProduct } from "../Types";

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
  const [sizes, setSizes] = useState<Size[]>([]);
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

  return (
    <div className={className}>
      <img
        className="product-card__img"
        src={`/${productColor.images[0]}`}
        alt={`Изображение ${productColor.name}`}
      />
      <div>
        {productColor.name} {productColor.id} {productId}
      </div>
      <div>{productColor.description}</div>
      <div>{productColor.price}</div>
      <select onChange={handleSizeChange} value={chosenSizeId ?? ""}>
        <option value="" disabled>
          выбрать размер
        </option>

        {sizes.map(({ id, label }) => (
          <option key={id} value={id}>
            Размер: {label}
          </option>
        ))}
      </select>
      <Button
        handlerClick={() => {
          if (chosenSizeId !== null) {
            const chooseSize = sizes.find(({ id }) => id === chosenSizeId);
            if (!chooseSize) return null
            const cartId = `${productId}${productColor.id}${chosenSizeId}`;
            handlerClick(cartId, productId, productColor, chooseSize);
          }
        }}
      >
        В корзину
      </Button>
    </div>
  );
};

export default ProductColor;
