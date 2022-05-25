import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { useRef } from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}
export default function NumberInput(props: NumberInputProps) {
  const inp = useRef<HTMLInputElement>(null);
  const add = (value: number) => {
    if (inp.current) {
      inp.current.value = (Number(inp.current.value) + value).toString();
      props.onChange(Number(inp.current.value));
    }
  };
  return (
    <div
      className="flex flex-row gap-2 
    items-center bg-palette-3 p-2 rounded-md">
      <MinusIcon
        className="h-5 w-5 cursor-pointer"
        onClick={() => {
          add(-(props?.step || 1));
        }}
      />
      <input
        type="number"
        ref={inp}
        className="bg-transparent text-palette-4 [appearance:textfield] 
        focus:outline-none text-center text-xl w-5
        mx-2"
        value={props.value}
        onChange={e => props.onChange(Number(e.target.value))}
        min={props.min}
        max={props.max}
        step={props.step}
      />
      <PlusIcon
        className="h-5 w-5 cursor-pointer"
        onClick={() => {
          add(props.step || 1);
        }}
      />
    </div>
  );
}
