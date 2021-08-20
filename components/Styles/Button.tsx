

import { BorderMd, BorderNone, BorderRounded } from '../AssetsSVG';
import SelectForm from '../FormSelect/SelectForm';

const options2 = [
  {
    id: 'ugygygygygygyg',
    name: 'Fira mono',
    value: 'yes',
    unavailable: false,
  },
  {
    id: 'ugygygygygygyi',
    name: 'Inter',
    value: 'false',
    unavailable: false,
  },
];

const defaultOption = {
  id: 'ugygygygygygye',
  name: 'Open Sans',
  value: '',
  unavailable: true,
};

export const ButtonStyles = ({
  onChange,
  style,
}: {
  onChange: any;
  style: any;
}): JSX.Element=> {

  const setFont = (font) => {
    onChange({ ...style, font: font.name });
  };

  const setBorderStyle = (border) => {
    onChange({ ...style, buttonBorderStyle: border });
  };
  return (
    <section className="mt-10">
      <h4 className="text-lg font-semibold mb">Buttons</h4>
      <hr className="border-gray-400 border-5 w-full mt-2" />

      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Fonts</h4>
          <SelectForm
            options={options2}
            defaultOption={defaultOption}
            onChange={setFont}
            name="select font"
            type="color"
          />
        </div>

        <div className="col-span-6">
          <div className="grid grid-cols-12 gap-8 items-center content-center">
            <div className="col-span-6">
              <h4 className="text-xl font-semibold mb-4">
                Button border style
              </h4>
              <div className="grid grid-cols-3 gap-5 items-center content-center">
                <div
                  className={
                    style?.buttonBorderStyle == 'NONE'
                      ? 'h-14 w-16 border-vca-blue border-2 flex justify-center items-center'
                      : 'h-14 w-16 border-2 bg-vca-grey-6 flex justify-center items-center'
                  }
                  onClick={() => setBorderStyle('NONE')}
                  style={{
                    background:
                      style?.buttonBorderStyle == 'NONE'
                        ? 'rgba(24, 144, 255, 0.1)'
                        : '',
                  }}
                >
                  <BorderNone />
                </div>
                <div
                  className={
                    style?.buttonBorderStyle == 'ROUNDED-MD'
                      ? 'h-14 w-16 border-vca-blue border-2 flex justify-center items-center'
                      : 'h-14 w-16 border-2 bg-vca-grey-6 flex justify-center items-center'
                  }
                  style={{
                    background:
                      style?.buttonBorderStyle == 'ROUNDED-MD'
                        ? 'rgba(24, 144, 255, 0.1)'
                        : '',
                  }}
                  onClick={() => setBorderStyle('ROUNDED-MD')}
                >
                  <BorderMd />
                </div>
                <div
                  className={
                    style?.buttonBorderStyle == 'ROUNDED'
                      ? 'h-14 w-16 border-vca-blue border-2 flex justify-center items-center'
                      : 'h-14 w-16 border-2 bg-vca-grey-6 flex justify-center items-center'
                  }
                  style={{
                    background:
                      style?.buttonBorderStyle == 'ROUNDED'
                        ? 'rgba(24, 144, 255, 0.1)'
                        : '',
                  }}
                  onClick={() => setBorderStyle('ROUNDED')}
                >
                  <BorderRounded />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <h4 className="text-xl font-semibold mb-4">Preview button</h4>
              <button
                className={
                  style?.buttonBorderStyle == 'ROUNDED-MD'
                    ? 'h-14 bg-vca-blue text-white text-lg font-bold rounded-md px-8'
                    : style?.buttonBorderStyle == 'ROUNDED'
                    ? 'h-14 bg-vca-blue text-white text-lg font-bold rounded-xl px-8'
                    : 'h-14 bg-vca-blue text-white text-lg font-bold  px-8'
                }
                disabled
              >
                Read all news
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
