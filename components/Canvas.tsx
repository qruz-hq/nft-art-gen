import { createDistribution, randomIndex } from '@/features/mathUtils';
import Asset from 'interfaces/Asset';
import Trait from 'interfaces/Trait';
import { LegacyRef, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import Button from './buttons/Button';

export default function Canvas() {
  const canvas = useRef<HTMLCanvasElement | undefined>(undefined);

  const store = useStore<{ traits: Trait[]; assets: Asset[] }>();
  const [rarity, setRarity] = useState<number>(0);
  const [traits, setTraits] = useState<Trait[]>(store.getState().traits);

  async function drawImage(
    context: CanvasRenderingContext2D,
    src: string,
    x: number,
    y: number,
  ) {
    return new Promise((resolve, reject) => {
      if (!src) return reject();
      var image = new Image();
      image.onload = function () {
        context.drawImage(
          image,
          x,
          y,
          canvas?.current?.width ?? 0,
          ((canvas?.current?.height ?? 0) * image.height) / image.width,
        );
        resolve(true);
        console.log('printed');
      };
      console.log('set');
      image.src = src;
    });
  }

  store.subscribe(() => {
    setTraits(store.getState().traits);
  });

  function generate() {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      let _rarity = 0;

      [...store.getState().traits]
        .sort((a, b) => b.index - a.index)
        .forEach(async trait => {
          const assets = store
            .getState()
            .assets.filter(a => a.traitId === trait.id);

          const common = Math.max.apply(
            null,
            assets.map(a => a.percentage),
          );
          const distribution = createDistribution(
            assets,
            assets.map(a => a.percentage * 100),
            1000,
          );

          const randomPick = assets[randomIndex(distribution)];
          _rarity += 1 - randomPick.percentage / common;
          console.log(common, randomPick.percentage, _rarity);
          await drawImage(ctx, randomPick.src, 0, 0);
          console.log('next');
        });
      setRarity(_rarity * 100);
    }
  }
  return (
    <div className="flex flex-col gap-6 p-12 items-center">
      <canvas
        className="rounded-xl bg-palette-3"
        ref={canvas as LegacyRef<HTMLCanvasElement>}
        width="500px"
        height={500}></canvas>
      <p>
        Rarity : {rarity.toFixed(2)}/{traits.length * 100}
      </p>
      <Button type="cta" onClick={generate}>
        Generate
      </Button>
    </div>
  );
}
