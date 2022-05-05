import { swapIndexes } from '@/features/traitSlice';
import { setTraitMenu } from '@/features/uiSlice';
import Trait from 'interfaces/Trait';
import { UIState } from 'interfaces/UI';
import { useStore } from 'react-redux';
import Button from './Button';

interface TraitButtonProps {
  trait: Trait;
}

export default function TraitButton({ trait }: TraitButtonProps) {
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

  return (
    <div draggable>
      <Button
        className={
          `cursor-ns-resize ` +
          (trait.id === store.getState().ui.traitMenu
            ? 'bg-palette-4 text-palette-1'
            : '')
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
      </Button>
    </div>
  );
}
