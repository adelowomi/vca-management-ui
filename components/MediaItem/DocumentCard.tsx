export const DocumentCard = ({ media }) => {
  return (
    <div key={media.id} className="flex flex-col">
      <div className="w-full h-44 justify-center items-center bg-blue-100 flex flex-col">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M76.5625 95.3125H23.4375C20.9511 95.3125 18.5665 94.3248 16.8084 92.5666C15.0502 90.8085 14.0625 88.4239 14.0625 85.9375V14.0625C14.0625 11.5761 15.0502 9.19153 16.8084 7.43337C18.5665 5.67522 20.9511 4.6875 23.4375 4.6875H67.1875L85.9375 23.4375V85.9375C85.9375 88.4239 84.9498 90.8085 83.1916 92.5666C81.4335 94.3248 79.0489 95.3125 76.5625 95.3125Z"
            fill="#ADCDEA"
          />
          <path
            d="M26.5625 26.5625H42.1875V45.3125H26.5625V26.5625Z"
            fill="#316FAA"
          />
          <path
            d="M14 70H86V85.625C86 88.1114 85.0106 90.496 83.2494 92.2541C81.4882 94.0123 79.0994 95 76.6087 95H23.3913C20.9006 95 18.5119 94.0123 16.7506 92.2541C14.9894 90.496 14 88.1114 14 85.625V70Z"
            fill="#316FAA"
          />
          <path
            d="M30.7878 76.1152H35.5427C36.615 76.1152 37.4324 76.1973 37.9949 76.3613C38.7507 76.584 39.3982 76.9795 39.9373 77.5479C40.4763 78.1162 40.8865 78.8135 41.1677 79.6396C41.449 80.46 41.5896 81.4736 41.5896 82.6807C41.5896 83.7412 41.4578 84.6553 41.1941 85.4229C40.8718 86.3604 40.4119 87.1191 39.8142 87.6992C39.363 88.1387 38.7537 88.4814 37.9861 88.7275C37.4119 88.9092 36.6443 89 35.6833 89H30.7878V76.1152ZM33.3894 78.2949V86.8291H35.3318C36.0583 86.8291 36.5828 86.7881 36.905 86.7061C37.3269 86.6006 37.6755 86.4219 37.9509 86.1699C38.2322 85.918 38.4607 85.5049 38.6365 84.9307C38.8123 84.3506 38.9001 83.5625 38.9001 82.5664C38.9001 81.5703 38.8123 80.8057 38.6365 80.2725C38.4607 79.7393 38.2146 79.3232 37.8982 79.0244C37.5818 78.7256 37.1804 78.5234 36.6941 78.418C36.3308 78.3359 35.6189 78.2949 34.5583 78.2949H33.3894Z"
            fill="white"
          />
          <path
            d="M43.2771 82.6367C43.2771 81.3242 43.4734 80.2227 43.866 79.332C44.1589 78.6758 44.5574 78.0869 45.0613 77.5654C45.571 77.0439 46.1277 76.6572 46.7312 76.4053C47.5339 76.0654 48.4597 75.8955 49.5085 75.8955C51.407 75.8955 52.9246 76.4844 54.0613 77.6621C55.2039 78.8398 55.7751 80.4775 55.7751 82.5752C55.7751 84.6553 55.2097 86.2842 54.0789 87.4619C52.948 88.6338 51.4363 89.2197 49.5437 89.2197C47.6277 89.2197 46.1042 88.6367 44.9734 87.4707C43.8425 86.2988 43.2771 84.6875 43.2771 82.6367ZM45.9578 82.5488C45.9578 84.0078 46.2947 85.1152 46.9685 85.8711C47.6423 86.6211 48.4978 86.9961 49.5349 86.9961C50.572 86.9961 51.4216 86.624 52.0837 85.8799C52.7517 85.1299 53.0857 84.0078 53.0857 82.5137C53.0857 81.0371 52.7605 79.9355 52.1101 79.209C51.4656 78.4824 50.6072 78.1191 49.5349 78.1191C48.4626 78.1191 47.5984 78.4883 46.9421 79.2266C46.2859 79.959 45.9578 81.0664 45.9578 82.5488Z"
            fill="white"
          />
          <path
            d="M66.0583 84.2627L68.5808 85.0625C68.1941 86.4688 67.5496 87.5146 66.6472 88.2002C65.7507 88.8799 64.6111 89.2197 63.2283 89.2197C61.5173 89.2197 60.1111 88.6367 59.0095 87.4707C57.908 86.2988 57.3572 84.6992 57.3572 82.6719C57.3572 80.5273 57.9109 78.8633 59.0183 77.6797C60.1257 76.4902 61.5818 75.8955 63.3865 75.8955C64.9626 75.8955 66.2429 76.3613 67.2273 77.293C67.8132 77.8438 68.2527 78.6348 68.5457 79.666L65.9705 80.2812C65.8181 79.6133 65.4988 79.0859 65.0125 78.6992C64.532 78.3125 63.946 78.1191 63.2546 78.1191C62.2996 78.1191 61.5232 78.4619 60.9255 79.1475C60.3337 79.833 60.0378 80.9434 60.0378 82.4785C60.0378 84.1074 60.3308 85.2676 60.9167 85.959C61.5027 86.6504 62.2644 86.9961 63.2019 86.9961C63.8933 86.9961 64.488 86.7764 64.9861 86.3369C65.4841 85.8975 65.8416 85.2061 66.0583 84.2627Z"
            fill="white"
          />
          <path
            d="M85.9375 23.4375H76.5625C74.0761 23.4375 71.6915 22.4498 69.9334 20.6916C68.1752 18.9335 67.1875 16.5489 67.1875 14.0625V4.6875L85.9375 23.4375Z"
            fill="#639BD1"
          />
          <path
            d="M73.4375 34.375H48.4375C48.0231 34.375 47.6257 34.2104 47.3326 33.9174C47.0396 33.6243 46.875 33.2269 46.875 32.8125C46.875 32.3981 47.0396 32.0007 47.3326 31.7076C47.6257 31.4146 48.0231 31.25 48.4375 31.25H73.4375C73.8519 31.25 74.2493 31.4146 74.5424 31.7076C74.8354 32.0007 75 32.3981 75 32.8125C75 33.2269 74.8354 33.6243 74.5424 33.9174C74.2493 34.2104 73.8519 34.375 73.4375 34.375Z"
            fill="#639BD1"
          />
          <path
            d="M54.6875 40.625H48.4375C48.0231 40.625 47.6257 40.4604 47.3326 40.1674C47.0396 39.8743 46.875 39.4769 46.875 39.0625C46.875 38.6481 47.0396 38.2507 47.3326 37.9576C47.6257 37.6646 48.0231 37.5 48.4375 37.5H54.6875C55.1019 37.5 55.4993 37.6646 55.7924 37.9576C56.0854 38.2507 56.25 38.6481 56.25 39.0625C56.25 39.4769 56.0854 39.8743 55.7924 40.1674C55.4993 40.4604 55.1019 40.625 54.6875 40.625Z"
            fill="#639BD1"
          />
          <path
            d="M73.4375 46.875H48.4375C48.0231 46.875 47.6257 46.7104 47.3326 46.4174C47.0396 46.1243 46.875 45.7269 46.875 45.3125C46.875 44.8981 47.0396 44.5007 47.3326 44.2076C47.6257 43.9146 48.0231 43.75 48.4375 43.75H73.4375C73.8519 43.75 74.2493 43.9146 74.5424 44.2076C74.8354 44.5007 75 44.8981 75 45.3125C75 45.7269 74.8354 46.1243 74.5424 46.4174C74.2493 46.7104 73.8519 46.875 73.4375 46.875Z"
            fill="#639BD1"
          />
          <path
            d="M62.5 53.125H26.5625C26.1481 53.125 25.7507 52.9604 25.4576 52.6674C25.1646 52.3743 25 51.9769 25 51.5625C25 51.1481 25.1646 50.7507 25.4576 50.4576C25.7507 50.1646 26.1481 50 26.5625 50H62.5C62.9144 50 63.3118 50.1646 63.6049 50.4576C63.8979 50.7507 64.0625 51.1481 64.0625 51.5625C64.0625 51.9769 63.8979 52.3743 63.6049 52.6674C63.3118 52.9604 62.9144 53.125 62.5 53.125Z"
            fill="#639BD1"
          />
          <path
            d="M73.4375 40.625H60.9375C60.5231 40.625 60.1257 40.4604 59.8326 40.1674C59.5396 39.8743 59.375 39.4769 59.375 39.0625C59.375 38.6481 59.5396 38.2507 59.8326 37.9576C60.1257 37.6646 60.5231 37.5 60.9375 37.5H73.4375C73.8519 37.5 74.2493 37.6646 74.5424 37.9576C74.8354 38.2507 75 38.6481 75 39.0625C75 39.4769 74.8354 39.8743 74.5424 40.1674C74.2493 40.4604 73.8519 40.625 73.4375 40.625Z"
            fill="#639BD1"
          />
          <path
            d="M73.4375 53.125H68.75C68.3356 53.125 67.9382 52.9604 67.6451 52.6674C67.3521 52.3743 67.1875 51.9769 67.1875 51.5625C67.1875 51.1481 67.3521 50.7507 67.6451 50.4576C67.9382 50.1646 68.3356 50 68.75 50H73.4375C73.8519 50 74.2493 50.1646 74.5424 50.4576C74.8354 50.7507 75 51.1481 75 51.5625C75 51.9769 74.8354 52.3743 74.5424 52.6674C74.2493 52.9604 73.8519 53.125 73.4375 53.125Z"
            fill="#639BD1"
          />
          <path
            d="M35.9375 59.375H26.5625C26.1481 59.375 25.7507 59.2104 25.4576 58.9174C25.1646 58.6243 25 58.2269 25 57.8125C25 57.3981 25.1646 57.0007 25.4576 56.7076C25.7507 56.4146 26.1481 56.25 26.5625 56.25H35.9375C36.3519 56.25 36.7493 56.4146 37.0424 56.7076C37.3354 57.0007 37.5 57.3981 37.5 57.8125C37.5 58.2269 37.3354 58.6243 37.0424 58.9174C36.7493 59.2104 36.3519 59.375 35.9375 59.375Z"
            fill="#639BD1"
          />
          <path
            d="M57.8125 59.375H42.1875C41.7731 59.375 41.3757 59.2104 41.0826 58.9174C40.7896 58.6243 40.625 58.2269 40.625 57.8125C40.625 57.3981 40.7896 57.0007 41.0826 56.7076C41.3757 56.4146 41.7731 56.25 42.1875 56.25H57.8125C58.2269 56.25 58.6243 56.4146 58.9174 56.7076C59.2104 57.0007 59.375 57.3981 59.375 57.8125C59.375 58.2269 59.2104 58.6243 58.9174 58.9174C58.6243 59.2104 58.2269 59.375 57.8125 59.375Z"
            fill="#639BD1"
          />
          <path
            d="M73.4375 59.375H64.0625C63.6481 59.375 63.2507 59.2104 62.9576 58.9174C62.6646 58.6243 62.5 58.2269 62.5 57.8125C62.5 57.3981 62.6646 57.0007 62.9576 56.7076C63.2507 56.4146 63.6481 56.25 64.0625 56.25H73.4375C73.8519 56.25 74.2493 56.4146 74.5424 56.7076C74.8354 57.0007 75 57.3981 75 57.8125C75 58.2269 74.8354 58.6243 74.5424 58.9174C74.2493 59.2104 73.8519 59.375 73.4375 59.375Z"
            fill="#639BD1"
          />
          <path
            d="M60.9375 28.125H48.4375C48.0231 28.125 47.6257 27.9604 47.3326 27.6674C47.0396 27.3743 46.875 26.9769 46.875 26.5625C46.875 26.1481 47.0396 25.7507 47.3326 25.4576C47.6257 25.1646 48.0231 25 48.4375 25H60.9375C61.3519 25 61.7493 25.1646 62.0424 25.4576C62.3354 25.7507 62.5 26.1481 62.5 26.5625C62.5 26.9769 62.3354 27.3743 62.0424 27.6674C61.7493 27.9604 61.3519 28.125 60.9375 28.125Z"
            fill="#639BD1"
          />
        </svg>
      </div>
      <div className="px-6 py-4 border border-vca-grey-4">
        <div className="flex flex-row mb-4">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V15H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22ZM18 17V19C18 19.2652 18.1054 19.5196 18.2929 19.7071C18.4804 19.8946 18.7348 20 19 20C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V17H18ZM16 20V4H4V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"
                fill="#4F4F4F"
              />
            </svg>
          </div>
          <div className="text-vca-grey-2 text-base font-bold ml-2">
            {media.name}
          </div>
        </div>
        <div className="text-vca-grey-3">{media.description}</div>
      </div>
    </div>
  );
};
