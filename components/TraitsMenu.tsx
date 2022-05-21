import { addTrait } from '@/features/traitSlice';
import Trait from 'interfaces/Trait';
import { useState } from 'react';
import { useStore } from 'react-redux';
import Button from './buttons/Button';
import TraitButton from './buttons/TraitButton';

export default function TraitsMenu() {
  const store = useStore<{ traits: Trait[] }>();
  const [traits, setTraits] = useState<Trait[]>(store.getState().traits);

  function _addTrait(name: string) {
    const newTrait = {
      id: store.getState().traits.length,
      name,
      index: store.getState().traits.length,
    };
    store.dispatch(addTrait(newTrait));
  }

  store.subscribe(() => {
    setTraits([...store.getState().traits].sort((a, b) => a.index - b.index));
  });

  return (
    <>
      <div className="overflow-y-auto rounded-xl max-h-[75%] flex flex-col gap-2 w-full">
        {traits &&
          traits.map((trait, index) => (
            <TraitButton key={`trait-${index}`} trait={trait} />
          ))}
      </div>
      <Button
        className="my-6 mx-auto "
        type="cta"
        onClick={() => _addTrait('New Trait')}>
        Add trait
      </Button>
    </>
  );
}
