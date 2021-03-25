import React from 'react';

import mergeClassNames from '../../helpers/mergeClassNames';

interface SVGProps {
  fill?: string;
  className?: string;
}

export const Add: React.FC<SVGProps> = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="17"
    viewBox="0 0 18 17"
    data-testid="add"
  >
    <text
      fill={fill || '#595959'}
      fillRule="evenodd"
      fontFamily="AvenirNext-DemiBold, Avenir Next"
      fontSize="16"
      fontWeight="500"
      transform="translate(-708 -27)"
    >
      <tspan x="708" y="40">
        +
      </tspan>
    </text>
  </svg>
);

export const BackArrow: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="18"
    viewBox="0 0 26 18"
    data-testid="back-arrow"
  >
    <path
      fill="#0C1A38"
      fillRule="nonzero"
      d="M8.492.27a.928.928 0 0 1 1.31 0 .9.9 0 0 1 0 1.278L3.158 8.09h21.925c.51 0 .917.4.917.903a.916.916 0 0 1-.917.917H3.158l6.644 6.53a.916.916 0 0 1 0 1.29.928.928 0 0 1-1.31 0L.275 9.638a.879.879 0 0 1 0-1.277L8.492.27z"
    />
  </svg>
);

export const Box: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="17"
    viewBox="0 0 15 17"
  >
    <g fill="#0035C1">
      <path d="M8.496 8.226L7.783 8.646 7.783 16.2 14.2 12.425 14.2 4.87zM9.533 1.564L7.151.1.783 4.002 3.169 5.467zM13.617 4.087L10.804 2.485 4.283 6.25 4.655 6.442 7.096 7.852 9.524 6.452zM3.842 8.869L2.652 8.246 2.652 6.309.2 4.87.2 12.425 6.617 16.2 6.617 8.646 3.842 7.017z" />
    </g>
  </svg>
);

export const DryVan: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="51"
    height="28"
    viewBox="0 0 51 28"
  >
    <g fill="none" fillRule="nonzero">
      <path fill="#0035C1" fillOpacity=".623" d="M5 5h27v14H5z" />
      <path
        fill="#0C1A38"
        d="M0 1.144v21.713C0 23.49.519 24 1.16 24h4.78c.531 2.283 2.602 4 5.071 4 2.47 0 4.54-1.717 5.071-4h17.676c.531 2.283 2.602 4 5.071 4 2.47 0 4.54-1.717 5.071-4h5.94c.64 0 1.16-.511 1.16-1.143v-8a1.129 1.129 0 0 0-.09-.464l-3.478-8a1.16 1.16 0 0 0-1.069-.678h-9.272v-4.57C37.09.512 36.57 0 35.93 0H1.16C.453.057-.003.553 0 1.144zm2.318 1.143h32.455V19.66a5.08 5.08 0 0 0-1.015 2.054H16.082a5.226 5.226 0 0 0-5.07-4 5.226 5.226 0 0 0-5.072 4H2.318V2.287zM37.091 8h8.512l2.481 5.714H37.091V8zm0 8h11.59v5.714h-4.78a5.226 5.226 0 0 0-5.072-4c-.61 0-1.192.11-1.738.303v-2.017zm-26.08 4c1.614 0 2.898 1.265 2.898 2.856 0 1.592-1.284 2.857-2.898 2.857s-2.897-1.265-2.897-2.857C8.114 21.266 9.397 20 11.01 20zm27.818 0c1.614 0 2.898 1.265 2.898 2.856 0 1.592-1.284 2.857-2.898 2.857s-2.897-1.265-2.897-2.857c0-1.591 1.283-2.857 2.897-2.857z"
      />
    </g>
  </svg>
);

export const Error: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <g fill="#0C1A38" fillRule="nonzero">
      <path d="M20 0C8.972 0 0 8.972 0 20s8.972 20 20 20 20-8.972 20-20S31.028 0 20 0zm0 36.571c-9.137 0-16.571-7.434-16.571-16.571S10.863 3.429 20 3.429 36.571 10.863 36.571 20 29.137 36.571 20 36.571z" />
      <path d="M27.733 12.267a1.712 1.712 0 0 0-2.422 0L20 17.577l-5.31-5.31a1.712 1.712 0 1 0-2.423 2.422l5.31 5.31-5.31 5.312a1.712 1.712 0 1 0 2.422 2.422L20 22.423l5.31 5.31c.335.335.774.502 1.212.502a1.712 1.712 0 0 0 1.211-2.924l-5.31-5.31 5.31-5.312c.67-.67.67-1.753 0-2.422z" />
    </g>
  </svg>
);

export const FlatBedTruck: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="24"
    viewBox="0 0 48 24"
  >
    <g fill="none">
      <path
        fill="#0C1A38"
        d="M47.87 11.725l-5.549-9.83c-.194-.343-.573-.558-.986-.558h-9.102c-.135-.44-.56-.766-1.069-.766-.617 0-1.118.474-1.118 1.058v12.974H1.118C.5 14.603 0 15.076 0 15.66v3.204c0 .584.5 1.058 1.118 1.058h1.381c.232 2.128 2.138 3.792 4.446 3.792 2.31 0 4.215-1.664 4.447-3.792h2.964c.232 2.128 2.138 3.792 4.447 3.792s4.215-1.664 4.446-3.792H34.81c.233 2.128 2.138 3.792 4.447 3.792s4.215-1.664 4.447-3.792h3.178c.618 0 1.118-.474 1.118-1.058v-6.642c.002-.173-.044-.343-.13-.497zm-24.962 6.086c-.184-.4-.433-.768-.732-1.094h7.87v1.09h-7.085c-.018 0-.035.004-.053.004zm-8.206-.005h-3.655c-.183-.399-.432-.765-.73-1.09h5.115c-.298.326-.546.691-.73 1.09zm-12.466-1.09h1.338c-.298.326-.546.691-.73 1.09h-.608v-1.09zm4.71 4.883c-1.232 0-2.235-.948-2.235-2.114s1.003-2.114 2.235-2.114 2.236.948 2.236 2.114-1.004 2.114-2.236 2.114zm11.858 0c-1.232 0-2.236-.948-2.236-2.114s1.004-2.114 2.236-2.114c1.232 0 2.235.948 2.235 2.114s-1.003 2.114-2.235 2.114zm20.455 0c-1.233 0-2.236-.948-2.236-2.114s1.003-2.114 2.236-2.114c1.232 0 2.235.948 2.235 2.114s-1.003 2.114-2.235 2.114zm4.101-3.793c-.688-1.498-2.267-2.55-4.101-2.55-1.835 0-3.414 1.052-4.102 2.55h-2.875V3.451h8.383l4.401 7.795h-8.042V8.17h1.848c.617 0 1.117-.473 1.117-1.057 0-.585-.5-1.057-1.117-1.057h-2.966c-.617 0-1.117.472-1.117 1.057v5.19c0 .583.5 1.057 1.117 1.057h9.861v4.446H43.36z"
      />
      <path fill="#0035C1" d="M2.37 0H26.37V12H2.37z" />
    </g>
  </svg>
);

export const HorizontalLine: React.FC<SVGProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="105"
    height="2"
    viewBox="0 0 105 2"
    data-testid="horizontal-line"
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#0C1A38"
      strokeDasharray="3 3 3 3"
      strokeLinecap="round"
      d="M0 1h106"
    />
  </svg>
);

export const VerticalLine: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2"
    height="37"
    viewBox="0 0 2 37"
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#0C1A38"
      strokeDasharray="2.88 2.88 2.88 2.88"
      strokeLinecap="round"
      strokeWidth=".96"
      d="M5.043 9.71L5.043 45.774"
      transform="translate(-4 -9.236)"
    />
  </svg>
);

export const MapPin: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="15"
    viewBox="0 0 11 15"
  >
    <path
      fill="#0C1A38"
      d="M5.5.441C2.467.441 0 2.618 0 5.294c0 .803.228 1.6.66 2.306l4.54 7.244c.06.096.175.156.3.156s.24-.06.3-.156l4.541-7.246c.431-.704.659-1.5.659-2.304C11 2.618 8.533.441 5.5.441zm0 7.28c-1.516 0-2.75-1.089-2.75-2.427S3.984 2.868 5.5 2.868s2.75 1.088 2.75 2.426S7.016 7.721 5.5 7.721z"
    />
  </svg>
);

export const MapPinLarge: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="50"
    viewBox="0 0 33 50"
  >
    <path
      fill="#143648"
      d="M16.5 0C7.402 0 0 7.477 0 16.667c0 2.758.683 5.494 1.981 7.92l13.617 24.876c.181.332.526.537.902.537s.721-.205.902-.537l13.622-24.884C32.317 22.16 33 19.425 33 16.667 33 7.477 25.598 0 16.5 0zm0 25c-4.549 0-8.25-3.738-8.25-8.333 0-4.595 3.701-8.334 8.25-8.334 4.549 0 8.25 3.739 8.25 8.334S21.049 25 16.5 25z"
    />
  </svg>
);

export const PaymentCards: React.FC<SVGProps> = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
  >
    <g fill={fill || '#595959'}>
      <path d="M12.585 4.642c.233 0 .298-.316.088-.41L4.47.586c-.499-.224-1.087 0-1.31.503L.287 7.543c-.224.5 0 1.089.502 1.313l1.654.717c.207.092.444-.06.444-.287v-2.74c0-1.049.85-1.9 1.897-1.9h7.8v-.004z" />
      <path d="M14.6 5.4H4.7c-.552 0-1 .453-1 1.011v7.078c0 .558.448 1.011 1 1.011h1.329c-.033-.198-.049-.4-.049-.605 0-.231.023-.456.062-.678H4.971V9.83h9.362v3.385h-1.075c.04.222.062.446.062.678 0 .205-.016.406-.049.605h1.33c.551 0 .999-.453.999-1.012V6.411c0-.558-.448-1.011-1-1.011zm-.267 2.344H4.97V6.683h9.362v1.06z" />
      <path d="M9.65 11.7c-1.353 0-2.45 1.097-2.45 2.45 0 1.353 1.097 2.45 2.45 2.45 1.353 0 2.45-1.097 2.45-2.45 0-1.353-1.097-2.45-2.45-2.45zm.704 3.416c-.106.131-.246.218-.408.262-.072.019-.103.056-.1.131.003.072 0 .143 0 .218 0 .066-.034.1-.096.1-.078.003-.156.003-.234 0-.069 0-.1-.04-.1-.106v-.159c0-.115-.006-.122-.118-.14-.144-.022-.284-.056-.415-.119-.103-.05-.115-.075-.084-.184.022-.08.044-.162.069-.24.028-.093.053-.102.14-.059.146.075.3.119.461.137.103.013.206.003.303-.04.18-.078.208-.287.056-.412-.053-.043-.11-.074-.172-.1-.159-.068-.324-.121-.47-.211-.244-.144-.396-.343-.378-.64.02-.333.21-.539.515-.65.124-.048.128-.044.128-.175v-.134c.003-.1.018-.116.118-.119h.09c.212 0 .212 0 .212.212 0 .15 0 .15.15.172.112.018.221.05.327.096.06.025.081.066.063.128-.025.09-.05.184-.081.271-.029.084-.057.097-.138.06-.165-.082-.336-.113-.517-.103-.047.003-.094.009-.137.028-.156.068-.184.243-.05.349.068.053.143.093.224.127.14.057.278.113.412.187.411.228.527.755.23 1.113z" />
    </g>
  </svg>
);

export const Question: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="10.24" cy="10.24" r="10.24" fill="#0035C1" />
      <text fill="#FFF" fontFamily="Helvetica" fontSize="14.52">
        <tspan x="7" y="15">
          ?
        </tspan>
      </text>
    </g>
  </svg>
);

export const Search: React.FC = () => (
  <svg
    fill="#595959"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-10 0 80 40"
    width="30px"
    height="30px"
  >
    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
  </svg>
);

interface UserSVGProps {
  fill?: string;
  className?: string;
  size?: number;
}

export const User: React.FC<UserSVGProps> = ({ fill, className, size }) => (
  <div
    className={mergeClassNames('app-icon', className)}
    style={{ width: size, height: size, color: fill }}
  >
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 96 96"
        width="1000px"
        height="1000px"
      >
        <rect width="96" height="96" />
        <g fill="#fff" style={{ opacity: 0.15 }}>
          <path d="M68.25,41.25c-.61,11.6-8.47,21-20.25,21s-19.64-9.46-20.25-21L27,27.75c0-10.31,7.5-21,21-21,5,0,13.5,1.59,14.25,8.25,3.66.09,4.3,2.24,5.57,4.82S69,25,69,27.75Z" />
          <path d="M55.5,67.5l-7.5,9-7.5-9C24.66,69.37,8.22,76.63,3.56,83.73A7.83,7.83,0,0,0,2.25,87c0,.48-.44,4.18-.75,9h93c-.31-4.77-.75-8.62-.75-9a5.54,5.54,0,0,0-1.31-3.25C87.79,76.63,71.34,69.37,55.5,67.5Z" />
        </g>
      </svg>
    </i>
  </div>
);

export const Origin: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="7"
    height="7"
    viewBox="0 0 7 7"
  >
    <path
      fill="#0C1A38"
      d="M3.5 0C5.433 0 7 1.52 7 3.397c0 1.876-1.567 3.397-3.5 3.397S0 5.274 0 3.397C0 1.521 1.567 0 3.5 0zm0 1.941c-.828 0-1.5.652-1.5 1.456 0 .804.672 1.456 1.5 1.456S5 4.2 5 3.397c0-.804-.672-1.456-1.5-1.456z"
    />
  </svg>
);

interface ChevronProps {
  className?: string;
  height?: number;
  width?: number;
}

export const ChevronUp = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="250 250 300 300"
  >
    <title />
    <g id="icomoon-ignore" />
    <path
      fill="#0c1a38"
      d="M456.832 408.899l-65.152-65.152c-4.246-4.246-11.121-4.246-15.354 0l-65.152 65.152c-4.246 4.246-4.246 11.121 0 15.354s11.121 4.246 15.354 0l57.476-57.476 57.476 57.476c4.246 4.246 11.121 4.246 15.354 0s4.246-11.121 0-15.354z"
    />
  </svg>
);

export const ChevronDown = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="250 250 300 300"
  >
    <title />
    <g id="icomoon-ignore" />
    <path
      fill="#0c1a38"
      d="M311.166 359.1l65.155 65.155c4.246 4.247 11.12 4.247 15.355 0l65.156-65.156c4.247-4.246 4.247-11.12 0-15.355s-11.12-4.246-15.355 0l-57.479 57.478-57.478-57.478c-4.246-4.247-11.12-4.247-15.355 0s-4.246 11.12 0 15.355z"
    />
  </svg>
);