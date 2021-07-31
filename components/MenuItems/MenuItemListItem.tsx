import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

import { Menuitem } from '../../classes/schema';
import { Site } from '../../classes/Site';
import DeleteModal from '../utilsGroup/DeleteModal';
import { EditMenuItemModal } from './EditMenuItemModal';

export const MenuItemListItem = ({
  item,
  siteId,
  token,
  index,
  remove,
  newSite,
}: {
  item: Menuitem;
  siteId?: string;
  token?: string;
  index?: number;
  remove?: any;
  newSite?: boolean;
}): JSX.Element => {
    const router = useRouter();
  const { addToast } = useToasts();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen,setEditModalOpen] = useState(false);

  const _thisSite = new Site(token);

  const deleteItem = async () => {
    if(newSite){
        remove(item,index);
        return;
    }
    try {
        const result = await (await _thisSite.deleteMenuItem({menuId:item.id}));
        if(!result.status){
            addToast("An Error Occurred",{ appearance : 'error'});
            return;
        }
        addToast("Deleted Successfully",{ appearance : 'success'});
        refreshData();
    } catch (error) {
        console.error(error);
        addToast('An error occurred',{ appearance : 'error'})
    }
  };

  const refreshData = () => {
    router.replace(router.asPath);
    setEditModalOpen(false)
  }


  
  return (
    <>
      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        name={'Menu Item'}
        handleIsdeleted={deleteItem}
      />
      <EditMenuItemModal
        modalIsOpen={editModalOpen}
        closeModal={refreshData}
        item={item}
        token={token}
        />
      {/* <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          name="Page"
          handleIsdeleted={deleteItem}
        /> */}
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
          {!newSite ? <p onClick={() => setEditModalOpen(true)}>Edit</p> : "" } 
              
            <RiDeleteBinLine className="h-6" onClick={() => setDeleteModalOpen(true)} />
          </span>
        </td>
      </tr>
    </>
  );
};
