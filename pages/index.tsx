import Canvas from '@/components/Canvas';
import TraitOptions from '@/components/TraitOptions';
import TraitsMenu from '@/components/TraitsMenu';
import { UIState } from 'interfaces/UI';
import { useStore } from 'react-redux';

function Home() {
  const store = useStore<{ ui: UIState }>();

  return (
    <div id="container" className=" bg-palette-1 h-screen flex">
      <div
        className="bg-palette-1 py-4 flex flex-col flex-col-3 
      items-center justify-between">
        <p
          className="relative text-[58px] text-center 
        text-palette-4 w-[300px] font-semibold">
          Gen
        </p>
        <div className="overflow-y-hidden flex items-center flex-col gap-2 w-full justify-center ">
          <TraitsMenu />
        </div>
        <div className="">Made by 0xqruz</div>
      </div>
      <div className="bg-palette-2 rounded-t-xl grow">
        <Canvas />
      </div>
      <div
        className="bg-palette-1 w-[300px] flex 
        flex-col items-center py-6 jutify-between">
        <TraitOptions />
      </div>
    </div>
  );
}

export default Home;
