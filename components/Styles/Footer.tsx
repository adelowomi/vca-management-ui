import ColorPicker from './ColorPicker';

export const FooterStyles = ({
  onChange,
  style,
}: {
  onChange: any;
  style: any;
}): JSX.Element=> {

  const setFontColor = (color) => {
    onChange({ ...style, fontColor: color });
  };
  const setBackgroundColor = (color) => {
    onChange({ ...style, backgroundColor: color });
  };
  const setAccentColor = (color) => {
    onChange({ ...style, accentColor: color });
  };
  return (
    <section className="mt-10">
      <h4 className="text-lg font-semibold mb">Footer</h4>
      <hr className="border-gray-400 border-5 w-full mt-2" />

      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Background color</h4>
          <ColorPicker color={style?.backgroundColor} setColor={setBackgroundColor} />
        </div>

        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Font color</h4>
          <ColorPicker color={style?.fontColor} setColor={setFontColor} />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Accent color</h4>
          <ColorPicker color={style?.accentColor} setColor={setAccentColor} />
        </div>
      </div>
    </section>
  );
};
