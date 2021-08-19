import React from 'react'

export const ItemCard = ({item,selected,onSelect}:{item:any,selected:boolean,onSelect:any}):JSX.Element => {
    return (
        <>
      <div
        onClick={() => onSelect(item.id)}
        className="group w-full overflow-hidden border border-gray-400 hover:shadow-lg bg-white shadow-md"
      >
        <div className="h-40 w-full">
          {item.media.type == "IMAGE" ? <img
            className="w-full h-full object-cover"
            src={item.media.image.small}
            alt="news image"
          />: ""  }
          <div className="relative -top-36 left-2 ">
            <input type="checkbox" defaultChecked={selected} checked={selected} className="px-3 h-6 w-6 border border-gray-300 mr-3" onClick={() => onSelect(item.id)}/>
          </div>
        </div>
        <div className="px-3 py-4">
          <h1 className="font-semibold text-lg mb-2">{item?.featured}</h1>
          <p className="text-gray-700 text-sm">{item?.description}</p>
        </div>
      </div>
    </>
    )
}
