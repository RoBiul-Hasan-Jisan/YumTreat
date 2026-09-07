import React, { useContext } from 'react';
import { FoodsContext } from '../../Context/FoodsContext';

const OrderedItem = ({ productID, quantity }) => {
  const { foods, loading } = useContext(FoodsContext);

  if (loading) return <div className="p-4 text-[var(--color-ink-soft)]">Loading...</div>;

  const product = foods.find(p => p._id === productID); // Find the correct product based on product_id

  if (!product) return <div className="p-4 text-[var(--color-ink-soft)]">Item not available</div>;

  return (
    <div className="flex items-center p-3 border-b border-[var(--color-line)] last:border-0">
      <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-paper-soft)] rounded-xl overflow-hidden">
        <img
          src={`../src/assets/foods/${product.imageUrl}.png`} // Use the product's imageUrl
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow ml-4 min-w-0">
        <h4 className="font-medium text-[var(--color-ink)] truncate">{product.name}</h4>
        <p className="text-sm text-[var(--color-ink-soft)] truncate">Product ID: {productID}</p>
      </div>

      <div className="ml-4 text-right">
        <p className="font-medium text-[var(--color-ink)]">
          <span className="ml-2">Qty: <strong>{quantity}</strong></span>
        </p>
        
      </div>
    </div>
  );
};

export default OrderedItem;