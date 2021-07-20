import Link from 'next/link';

import { truncate } from './MediaItemCard';

export const VideoCard = ({ media, link }) => {
  return (
    <div key={media.id} className="flex flex-col w-72">
      <div className="w-full h-44 justify-center items-center bg-blue-100 flex flex-col">
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.63672 2.63672H87.3633V87.3633H2.63672V2.63672Z"
            fill="#639BD1"
          />
          <path d="M2.63672 45H87.3633V87.3633H2.63672V45Z" fill="#316FAA" />
          <path
            d="M87.3633 0H2.63672C1.18055 0 0 1.18055 0 2.63672V87.3633C0 88.8195 1.18055 90 2.63672 90H87.3633C88.8195 90 90 88.8195 90 87.3633V2.63672C90 1.18055 88.8195 0 87.3633 0ZM28.2422 75.9375V84.7266H19.3946V75.9375H28.2422ZM33.5157 75.9375H42.3633V84.7266H33.5157V75.9375ZM47.6367 75.9375H56.4843V84.7266H47.6367V75.9375ZM61.7578 75.9375H70.6053V84.7266H61.7578V75.9375ZM5.27344 70.6641V19.3359H84.7266V70.6641H5.27344ZM61.7578 14.0625V5.27344H70.6053V14.0625H61.7578ZM56.4843 14.0625H47.6367V5.27344H56.4843V14.0625ZM42.3633 14.0625H33.5157V5.27344H42.3633V14.0625ZM28.2422 14.0625H19.3946V5.27344H28.2422V14.0625ZM84.7266 14.0625H75.8788V5.27344H84.7266V14.0625ZM5.27344 5.27344H14.121V14.0625H5.27344V5.27344ZM5.27344 75.9375H14.121V84.7266H5.27344V75.9375ZM84.7266 84.7266H75.8788V75.9375H84.7266V84.7266Z"
            fill="#ADCDEA"
          />
          <path
            d="M84.7266 45V70.6641H5.27344V45H0V87.3633C0 88.8195 1.18055 90 2.63672 90H87.3633C88.8195 90 90 88.8195 90 87.3633V45H84.7266ZM14.121 84.7266H5.27344V75.9375H14.121V84.7266ZM28.2422 84.7266H19.3946V75.9375H28.2422V84.7266ZM42.3633 84.7266H33.5157V75.9375H42.3633V84.7266ZM56.4843 84.7266H47.6367V75.9375H56.4843V84.7266ZM70.6053 84.7266H61.7578V75.9375H70.6053V84.7266ZM84.7266 84.7266H75.8788V75.9375H84.7266V84.7266Z"
            fill="#639BD1"
          />
          <path
            d="M45 59C37.2804 59 31 52.7196 31 45C31 37.2804 37.2804 31 45 31C52.7196 31 59 37.2804 59 45C59 52.7196 52.7196 59 45 59Z"
            fill="#19538B"
          />
          <path
            d="M42.5651 52.3041C42.2867 52.3041 42.0072 52.2406 41.7487 52.1114C41.13 51.8019 40.7393 51.1697 40.7393 50.478V39.5215C40.7393 38.8298 41.13 38.1976 41.7487 37.8881C42.3673 37.5788 43.1076 37.6455 43.661 38.0606L50.9653 43.5389C51.4252 43.8838 51.6958 44.425 51.6958 44.9998C51.6958 45.5745 51.4252 46.1157 50.9653 46.4606L43.661 51.9389C43.3389 52.1805 42.9532 52.3041 42.5651 52.3041Z"
            fill="#F9F9F9"
          />
        </svg>
      </div>
      <div className="px-6 py-4 border bg-white border-vca-grey-4 h-32">
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
                d="M16 4C16.2652 4 16.5196 4.10536 16.7071 4.29289C16.8946 4.48043 17 4.73478 17 5V9.2L22.213 5.55C22.288 5.49746 22.3759 5.4665 22.4672 5.4605C22.5586 5.4545 22.6498 5.4737 22.731 5.51599C22.8122 5.55829 22.8802 5.62206 22.9276 5.70035C22.9751 5.77865 23.0001 5.86846 23 5.96V18.04C23.0001 18.1315 22.9751 18.2214 22.9276 18.2996C22.8802 18.3779 22.8122 18.4417 22.731 18.484C22.6498 18.5263 22.5586 18.5455 22.4672 18.5395C22.3759 18.5335 22.288 18.5025 22.213 18.45L17 14.8V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H2C1.73478 20 1.48043 19.8946 1.29289 19.7071C1.10536 19.5196 1 19.2652 1 19V5C1 4.73478 1.10536 4.48043 1.29289 4.29289C1.48043 4.10536 1.73478 4 2 4H16ZM15 6H3V18H15V6ZM7.4 8.829C7.47611 8.82879 7.55069 8.8503 7.615 8.891L11.97 11.663C12.0266 11.6992 12.0731 11.749 12.1054 11.8079C12.1376 11.8668 12.1545 11.9329 12.1545 12C12.1545 12.0671 12.1376 12.1332 12.1054 12.1921C12.0731 12.251 12.0266 12.3008 11.97 12.337L7.615 15.11C7.55434 15.1487 7.48438 15.1703 7.41248 15.1725C7.34059 15.1748 7.26941 15.1576 7.20646 15.1228C7.14351 15.088 7.0911 15.0368 7.05477 14.9747C7.01844 14.9127 6.99951 14.8419 7 14.77V9.23C7 9.009 7.18 8.83 7.4 8.83V8.829ZM21 8.84L17 11.64V12.358L21 15.158V8.84Z"
                fill="#4F4F4F"
              />
            </svg>
          </div>
          <Link href={link}>
            <a
              role="heading"
              className="text-vca-grey-2 text-base font-bold ml-2"
            >
              {media.name}
            </a>
          </Link>
        </div>
        <div className="text-vca-grey-3">{truncate(media.description, 50)}</div>
      </div>
    </div>
  );
};
