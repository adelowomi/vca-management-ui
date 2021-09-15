import Link from 'next/link';
import ReactPlayer from 'react-player';

import { truncate } from './MediaItemCard';

export const VideoCard = ({ media, link }) => {
  return (
    <div key={media.id} className="flex flex-col w-72">
      <div className="w-full h-44 justify-center items-center bg-blue-100 flex flex-col">
        <ReactPlayer
          url={media?.video.url}
          className="h-full w-full"
          height={'100%'}
          width={'100%'}
          controls={false}
        />
      </div>
      <div className="px-6 py-4 border bg-white border-vca-grey-4 h-40">
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
              {truncate(media.name, 30)}
            </a>
          </Link>
        </div>
        <div className="text-vca-grey-3">{truncate(media.description, 50)}</div>
      </div>
    </div>
  );
};
