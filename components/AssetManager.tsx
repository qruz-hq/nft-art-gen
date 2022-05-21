import Slider from '@/components/Slider';
import { toggleLocked, updateAssetPercentage } from '@/features/assetSlice';
import { openModal } from '@/features/uiSlice';
import Asset from 'interfaces/Asset';
import { UIState } from 'interfaces/UI';
import Image from 'next/image';
import { useState } from 'react';
import { useStore } from 'react-redux';
interface AssetManagerProps {
  id: string;
}

function AssetManager({ id }: AssetManagerProps) {
  const store = useStore<{ assets: Array<Asset>; ui: UIState }>();
  const currentTraitId = store.getState().ui.traitMenu;
  let asset = store
    .getState()
    .assets.find(asset => asset.id === id && asset.traitId === currentTraitId);
  store.subscribe(() => {
    asset = store.getState().assets.find(asset => asset.id === id);
    if (asset) {
      setPercentage(asset.percentage);
      setLocked(asset.locked);
    }
  });
  const [percentage, setPercentage] = useState(asset?.percentage ?? 0.0);
  const [locked, setLocked] = useState(asset?.locked ?? false);
  function updatePercentage(value: number) {
    store.dispatch(
      updateAssetPercentage({ id, percentage: value, traitId: currentTraitId }),
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <div className="transition-all bg-palette-3 rounded-md flex p-2 cursor-pointer border border-transparent hover:border-palette-2">
        <Image
          src={asset?.src ?? '/asset.png'}
          height={50}
          width={50}
          alt="Asset"
          onClick={() =>
            store.dispatch(
              openModal({
                modalName: 'fileUpload',
                modalContent: { assetId: id },
              }),
            )
          }
        />
      </div>
      <div className="flex flex-col self-center items-center">
        <p>{asset?.name ?? 'Asset Name'}</p>
        <Slider onChange={updatePercentage} percentage={percentage} />
      </div>
      <button
        className={`${
          locked ? `text-palette-2` : ``
        } self-center mb-1 w-12 text-center`}
        onClick={() => store.dispatch(toggleLocked({ id }))}>
        {percentage > 0.09 ? `${asset?.percentage.toFixed(1)}%` : 'Unique'}
      </button>
    </div>
  );
}

export default AssetManager;
