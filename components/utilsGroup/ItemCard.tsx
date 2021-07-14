import React from 'react';

interface ItemCardProps {
  id: string;
  media: string;
  featured: string;
  description: string;
  createdAt: Date;
}
const ItemCard: React.FC<ItemCardProps> = ({
  id,
  media,
  featured,
  description,
  createdAt,
}) => {
  return (
    <div
      className="group w-full overflow-hidden border border-gray-100 hover:shadow-lg bg-white shadow-md h-auto"
      key={id}
    >
      <div className="h-40 w-full">
        <img
          className="w-full h-full object-cover"
          src={media}
          alt="news image"
        />
      </div>
      <div className="px-3 py-4">
        <h1 className="font-semibold text-lg mb-2">{featured}</h1>
        <p className="text-gray-700 text-sm">{description}</p>
        <div className="mt-4">
          <p className="text-xs italic text-gray-500">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
