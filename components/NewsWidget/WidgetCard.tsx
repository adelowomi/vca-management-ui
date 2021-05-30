import React from 'react';

interface CardsProps {
  item: {
    id: string;
    mediaUrl: string;
    title: string;
    content: string;
  };
}
export const WidgetCard: React.FC<CardsProps> = ({
  item: { mediaUrl, content, title },
}) => {
  return (
    <>
      <div className="group w-full overflow-hidden border border-gray-100 hover:shadow-lg bg-white shadow-md">
        <div className="h-40 w-full">
          <img
            className="w-full h-full object-cover"
            src={mediaUrl}
            alt="news image"
          />
        </div>
        <div className="px-3 py-4">
          <h1 className="font-semibold text-lg mb-2">{title}</h1>
          <p className="text-gray-700 text-sm">{content}</p>
        </div>
      </div>
    </>
  );
};
