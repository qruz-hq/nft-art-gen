interface SliderProps {
  onChange: (value: number) => void;
  percentage: number;
}

function Slider({ onChange, percentage }: SliderProps) {
  return (
    <>
      <input
        type="range"
        name="percentage"
        id="asset-p"
        step={0.25}
        value={percentage}
        className="appearance-none bg-palette-4 rounded-md w-full h-2 my-2"
        onChange={e => onChange(parseFloat(e.target.value))}
      />
    </>
  );
}

export default Slider;
