import Link from 'next/link';
import * as React from 'react';

export default function BreadCrumb() {
  return (
    <div className="breadCrumb">
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div className="flex items-center">
              {/* <!-- Heroicon name: solid/chevron-right --> */}
              <a
                href="#"
                className="font-medium text-base text-black hover:text-gray-700"
              >
                Pages
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              {/* <!-- Heroicon name: solid/chevron-right --> */}
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href="#">
                <a
                  aria-current="page"
                  className="ml-4 text-base font-medium text-gray-500 hover:text-gray-700"
                >
                  Add New
                </a>
              </Link>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
}
