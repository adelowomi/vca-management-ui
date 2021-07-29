import Link from 'next/link';
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

type MenuItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: string;
  type: MenuItemType;
};

enum MenuItemType {
  PAGE,
  PERFORMANCE,
  NEWS,
}

export const MenuItemListItem = ({item,siteId}:{item:MenuItem,siteId:string}) => {
  return (
    <tr className={`text-left  `} key={item.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
        <input
          type="checkbox"
          className="px-3 h-5 w-6 border border-gray-300"
          name=""
          id=""
        />
      </td>

      <td className="px-6 py-4 text-gray-500 whitespace-nowrap ">
        <Link href={``}>{item.name}</Link>
      </td>
      <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-500">
        <Link href={`/sites/${siteId}/pages`}>{item.description}</Link>
      </td>
      <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-gray-500">
        <Link href={``}>
          <span>
            <p>{item.type}</p>
          </span>
        </Link>
      </td>
      <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-800">
        <span className="flex space-x-5">
          <Link href={`/${siteId}/edit`}>
            <p>Edit</p>
          </Link>

          <RiDeleteBinLine className="h-6" />
        </span>
      </td>
    </tr>
  );
}
