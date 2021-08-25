import SelectForm from '../FormSelect/SelectForm';
import ColorPicker from './ColorPicker';

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

export const BodyStyles = ({
  onChange,
  style,
}: {
  onChange: any;
  style: any;
}): JSX.Element => {
  const setFontColor = (color) => {
    onChange({ ...style, fontColor: color });
  };
  const setBackgroundColor = (color) => {
    onChange({ ...style, backgroundColor: color });
  };
  const setAccentColor = (color) => {
    onChange({ ...style, accentColor: color });
  };
  const setFont = (font) => {
    onChange({ ...style, bodyFont: font.name });
  };
  return (
    <section className="mt-10">
      <h4 className="text-lg font-semibold mb">Body</h4>
      <hr className="border-gray-400 border-5 w-full mt-2" />

      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Body font</h4>
          <SelectForm
            options={options2}
            defaultOption={defaultOption}
            onChange={setFont}
            name="select font"
            type="font"
          />
        </div>

        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Font color</h4>
          <ColorPicker color={style?.fontColor} setColor={setFontColor} />
          {/* <SelectForm
            options={options}
            defaultOption={defaultColor}
            onChange={onChange}
            name="select color"
            type="coor"
          /> */}
        </div>
      </div>
      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Background color</h4>
          <ColorPicker
            color={style?.backgroundColor}
            setColor={setBackgroundColor}
          />
        </div>

        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Accent color</h4>
          <ColorPicker color={style?.accentColor} setColor={setAccentColor} />
        </div>
      </div>
    </section>
  );
};
