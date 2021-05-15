import React from 'react';

const Table = () => {
  return (
    <>
      {/* <div className="row-2 flex flex-col px-20">
        <div className="first-column mt-8">
          <div className="pages_status_wrapper flex flex-row">
            <div className="border-r border-5 border-gray-300 px-1">
              <h3 className="text-xs text-indigo-600">All</h3>
            </div>
            <div className="border-r border-5 border-gray-300 px-1">
              <h3 className="text-xs text-gray-500">Draft</h3>
            </div>
            <div className="pl-1">
              <h3 className="text-xs text-gray-500">Published</h3>
            </div>
          </div>
          <div className="second_colum flex flex-row mt-2">
            <div className="relative inline-block text-left">
              <div className="mr-2">
                <button
                  onClick={dropdownClick}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-indigo-600 shadow-sm px-4 py-1 font-light bg-white text-sm  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-x-500"
                  id="options-menu"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Bulk Action
                  <svg
                    className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                className={`origin-top-right absolute right-0 ${
                  dropdown ? 'show' : 'hidden'
                } mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu`}
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Action one
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Action two
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Action three
                  </a>
                </div>
              </div>
            </div>
            <div className="apply_button">
              <button
                type="button"
                className="inline-flex items-center px-5 py-1 border border-transparent text-sm font-light rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="table_div_wrapper mt-7">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <input type="checkbox" name="" id="" />
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          TITLE
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          AUTHOR
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          DATE AND TIME
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {pages.map((el: any) => (
                          <tr
                            className={`${
                              count++ % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                            key={el.id}
                          >
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              <input type="checkbox" name="" id="" />
                            </td>

                            <td className="px-6 py-2  whitespace-nowrap text-sm font-medium text-black">
                              <Link href={`/sites/${el.site}/pages/${el.id}`}>
                                {el.name}
                              </Link>
                            </td>
                            <td className="px-6 py-2 cursor-pointer whitespace-nowrap text-sm text-gray-500">
                              <Link href={`/sites/${el.site}/pages/${el.id}`}>
                                userName
                              </Link>
                            </td>
                            <td className="px-6 py-2 cursor-pointer whitespace-nowrap text-sm  text-gray-500">
                              <Link href={`/sites/${el.site}/pages/${el.id}`}>
                                <span>
                                  <p>Published</p>
                                  <p>{moment(el.createdAt).format('llll')}</p>
                                </span>
                              </Link>
                            </td>
                          </tr>
                        ))} 
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Table;
