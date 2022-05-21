import { removeAssetsFromTrait } from '@/features/assetSlice';
import { removeTrait, swapIndexes } from '@/features/traitSlice';
import { setTraitMenu } from '@/features/uiSlice';
import { XIcon } from '@heroicons/react/solid';
import Trait from 'interfaces/Trait';
import { UIState } from 'interfaces/UI';
import { useState } from 'react';
import { useStore } from 'react-redux';
import Button from './Button';

interface TraitButtonProps {
  trait: Trait;
}

export default function TraitButton({ trait }: TraitButtonProps) {
  const [showClose, setShowClose] = useState(false);
  const store = useStore<{ traits: Trait[]; ui: UIState }>();

  function openMenu() {
    store.dispatch(setTraitMenu(trait.id));
  }

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData('text/plain', '' + trait.id);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    console.log();
    if (target && target.dataset.trait) {
      store.dispatch(
        swapIndexes({
          from: trait.id,
          to: Number(e.dataTransfer.getData('text')),
        }),
      );
    }
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function _deleteTrait() {
    store.dispatch(removeTrait(trait.id));
    store.dispatch(removeAssetsFromTrait(trait.id));
  }

  return (
    <div
      className="relative"
      onPointerEnter={() => setShowClose(true)}
      onPointerLeave={() => setShowClose(false)}
      draggable>
      <Button
        className={
          `relative cursor-ns-resize transition-colors my-2 block mx-auto ` +
          (trait.id === store.getState().ui.traitMenu
            ? 'bg-palette-4 text-palette-1'
            : 'hover:bg-palette-2')
        }
        onClick={() => openMenu()}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        draggable={true}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e: Event) => {
          e.preventDefault();
        }}
        data-trait={trait.id}
        id={`trait-${trait.id}`}>
        {trait.name}
        {showClose && (
          <div className="transition absolute cursor-pointer animate-pop right-[5px] top-[12px] bg-palette-3 rounded-full p-1 text-palette-5 hover:bg-palette-5 hover:text-palette-4">
            <XIcon className="h-5 w-5 " onClick={_deleteTrait} />
          </div>
        )}
      </Button>
    </div>
  );
}
