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
      {traits &&
        traits.map((trait, index) => (
          <TraitButton key={`trait-${index}`} trait={trait} />
        ))}
      <Button
        className="mt-12"
        type="cta"
        onClick={() => _addTrait('New Trait')}>
        Add trait
      </Button>
    </>
  );
}
