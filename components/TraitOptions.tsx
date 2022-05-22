import { addAsset } from '@/features/assetSlice';
import { setTraitName } from '@/features/traitSlice';
import { openModal } from '@/features/uiSlice';
import Asset from 'interfaces/Asset';
import Trait from 'interfaces/Trait';
import { UIState } from 'interfaces/UI';
import { useRef, useState } from 'react';
import { useStore } from 'react-redux';
import AssetManager from './AssetManager';
import Button from './buttons/Button';

export default function TraitOptions() {
  const store = useStore<{ traits: Trait[]; ui: UIState; assets: Asset[] }>();
  const [trait, setTrait] = useState<Trait | undefined>(
    store.getState().traits.find(t => t.id === store.getState().ui.traitMenu),
  );
  const [assets, setAssets] = useState<Asset[]>(
    store.getState().assets.filter(a => a.traitId === trait?.id),
  );

  const title = useRef<HTMLInputElement>(null);

  store.subscribe(() => {
    const newTrait = store
      .getState()
      .traits.find(t => t.id === store.getState().ui.traitMenu);
    if (newTrait?.id !== trait?.id) {
      setTrait(newTrait);

      setAssets(
        store
          .getState()
          .assets.filter(a => a.traitId === store.getState().ui.traitMenu),
      );

      if (title.current) {
        title.current.value = newTrait?.name ?? 'New Trait';
        if (newTrait?.name === 'New Trait') {
          title.current.focus();
        }
      }
    }
  });

  function _addAsset(src: string, name: string) {
    const newAsset = {
      id: store.getState().assets.length,
      src,
      name,
      traitId: trait?.id,
    };
    store.dispatch(addAsset(newAsset));
  }

  function updateTitle() {
    if (title.current) {
      store.dispatch(
        setTraitName({ id: trait?.id, name: title.current.value }),
      );
    }
  }

  if (!trait) return null;
  return (
    <>
      <div className="flex gap-3 items-center">
        <input
          className="w-32 max-w-64 text-palette-4 font-semibold
          focus:bg-palette-2 bg-transparent focus:outline-0 py-5 
          h-14 text-center rounded-md text-[24px]"
          ref={title}
          contentEditable
          defaultValue={trait.name}
          onInput={updateTitle}
          onFocus={e => {
            setTimeout(() => e.target.select(), 50);
          }}></input>
        <svg
          onClick={() => {
            () => title?.current?.focus();
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 
            2.5 0 113.536 3.536L6.5 
          21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      <div
        className="flex flex-col gap-4 grow items-center 
  justify-center scroll">
        {assets.map((slider, index) => (
          <AssetManager key={slider.id + ' ' + index} id={slider.id} />
        ))}
      </div>
      <Button
        className="mt-12"
        type="cta"
        onClick={() => store.dispatch(openModal({ modalName: 'fileUpload' }))}>
        Add asset
      </Button>
    </>
  );
}
