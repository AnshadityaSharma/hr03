import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetInventory = ({ onRequestAsset }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryData = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      category: 'laptop',
      specifications: '16GB RAM, 512GB SSD, M2 Pro',
      stockLevel: 5,
      totalStock: 12,
      price: '$2,499',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      status: 'available'
    },
    {
      id: 2,
      name: 'Dell UltraSharp 27"',
      category: 'monitor',
      specifications: '4K, USB-C, Height Adjustable',
      stockLevel: 8,
      totalStock: 15,
      price: '$649',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
      status: 'available'
    },
    {
      id: 3,
      name: 'iPhone 15 Pro',
      category: 'mobile',
      specifications: '256GB, Titanium, Pro Camera',
      stockLevel: 0,
      totalStock: 8,
      price: '$1,199',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      status: 'out_of_stock'
    },
    {
      id: 4,
      name: 'Herman Miller Chair',
      category: 'furniture',
      specifications: 'Ergonomic, Adjustable Height',
      stockLevel: 3,
      totalStock: 10,
      price: '$1,395',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      status: 'low_stock'
    },
    {
      id: 5,
      name: 'Microsoft Surface Pro',
      category: 'laptop',
      specifications: '16GB RAM, 256GB SSD, Touch Screen',
      stockLevel: 6,
      totalStock: 10,
      price: '$1,299',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
      status: 'available'
    },
    {
      id: 6,
      name: 'Logitech MX Master 3',
      category: 'accessories',
      specifications: 'Wireless, Ergonomic, Multi-device',
      stockLevel: 15,
      totalStock: 20,
      price: '$99',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
      status: 'available'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'Package' },
    { value: 'laptop', label: 'Laptops', icon: 'Laptop' },
    { value: 'monitor', label: 'Monitors', icon: 'Monitor' },
    { value: 'mobile', label: 'Mobile', icon: 'Smartphone' },
    { value: 'accessories', label: 'Accessories', icon: 'Mouse' },
    { value: 'furniture', label: 'Furniture', icon: 'Armchair' },
    { value: 'software', label: 'Software', icon: 'Code' }
  ];

  const filteredInventory = inventoryData?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    const matchesSearch = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.specifications?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStockStatus = (item) => {
    if (item?.stockLevel === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (item?.stockLevel <= 3) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const handleRequestAsset = (item) => {
    onRequestAsset({
      category: item?.category,
      itemType: item?.name,
      specifications: item?.specifications,
      preferredBrand: item?.name?.split(' ')?.[0]
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl">
            <Icon name="Package" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Asset Inventory</h2>
            <p className="text-sm text-slate-600">Available equipment and current stock levels</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setSelectedCategory(category?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-spring ${
              selectedCategory === category?.value
                ? 'bg-primary text-white' :'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory?.map((item) => {
          const stockStatus = getStockStatus(item);
          return (
            <div key={item?.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-elevation-2 transition-spring">
              <div className="aspect-video bg-slate-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-slate-900">{item?.name}</h3>
                  <p className="text-sm text-slate-600">{item?.specifications}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">{item?.price}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus?.color}`}>
                    {stockStatus?.label}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Stock: {item?.stockLevel}/{item?.totalStock}
                  </div>
                  <div className="w-20 bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item?.stockLevel === 0 ? 'bg-red-500' :
                        item?.stockLevel <= 3 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(item?.stockLevel / item?.totalStock) * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button
                  variant={item?.stockLevel === 0 ? 'outline' : 'default'}
                  size="sm"
                  fullWidth
                  disabled={item?.stockLevel === 0}
                  onClick={() => handleRequestAsset(item)}
                  iconName={item?.stockLevel === 0 ? 'AlertCircle' : 'Plus'}
                  iconPosition="left"
                >
                  {item?.stockLevel === 0 ? 'Out of Stock' : 'Request Asset'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {filteredInventory?.length === 0 && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4">
            <Icon name="Package" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No items found</h3>
          <p className="text-slate-600">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};

export default AssetInventory;