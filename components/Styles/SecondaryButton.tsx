import ColorPicker from './ColorPicker';

export const SecondaryButtonStyles = ({
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
  const setHoverBackgroundColor = (color) => {
    onChange({ ...style, hoverBackgroundColor: color });
  };
  const setHoverFontColor = (color) => {
    onChange({ ...style, hoverFontColor: color });
  };
  return (
    <section className="mt-10">
      <h4 className="text-lg font-semibold mb">Secondary button</h4>
      <hr className="border-gray-400 border-5 w-full mt-2" />

      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Background Color</h4>
          <ColorPicker
            color={style?.backgroundColor}
            setColor={setBackgroundColor}
          />
        </div>

        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Font color</h4>
          <ColorPicker color={style?.fontColor} setColor={setFontColor} />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Hover background color</h4>
          <ColorPicker
            color={style?.hoverBackgroundColor}
            setColor={setHoverBackgroundColor}
          />
        </div>

        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Hover font color</h4>
          <ColorPicker
            color={style?.hoverFontColor}
            setColor={setHoverFontColor}
          />
        </div>
      </div>
    </section>
  );
};
