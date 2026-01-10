import React from 'react';

const AVAILABLE_SIZES = ['UK04', 'UK06', 'UK08', 'UK10', 'UK12', 'UK14'];

export function SizeStockInput({
  selectedSizes,
  stock,
  onSizesChange,
  onStockChange
}) {
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter(s => s !== size));
      const newStock = {
        ...stock
      };
      delete newStock[size];
      onStockChange(newStock);
    } else {
      onSizesChange([...selectedSizes, size]);
      onStockChange({
        ...stock,
        [size]: 0
      });
    }
  };
  const updateStock = (size, value) => {
    onStockChange({
      ...stock,
      [size]: Math.max(0, value)
    });
  };
  return <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Available Sizes & Stock
      </label>

      <div className="grid grid-cols-3 gap-3">
        {AVAILABLE_SIZES.map(size => <label key={size} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggleSize(size)} className="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300" />
            <span className="text-sm font-medium text-gray-700">{size}</span>
          </label>)}
      </div>

      {selectedSizes.length > 0 && <div className="space-y-3 pt-2">
          <p className="text-sm font-medium text-gray-700">Stock per Size:</p>
          <div className="grid grid-cols-2 gap-3">
            {selectedSizes.map(size => <div key={size} className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 w-16">{size}:</label>
                <input type="number" min="0" value={stock[size] || 0} onChange={e => updateStock(size, parseInt(e.target.value) || 0)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent" />
              </div>)}
          </div>
        </div>}
    </div>;
}
