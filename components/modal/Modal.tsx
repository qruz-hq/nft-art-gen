import { addAsset } from '@/features/assetSlice';
import { closeModal } from '@/features/uiSlice';
import { UIState } from 'interfaces/UI';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import FileUploadModal from './FileUploadModal';

export default function Modal({ children }: any) {
  const store = useStore<{ ui: UIState }>();
  const [isOpen, setIsOpen] = useState(false);

  store.subscribe(() => {
    setIsOpen(store.getState().ui.isModalOpen);
  });

  function _closeModal() {
    store.dispatch(closeModal());
    setIsOpen(false);
  }
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && store.getState().ui.isModalOpen) {
      _closeModal();
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', e => handleKeyDown(e));
    return () => {
      document.removeEventListener('keydown', e => handleKeyDown(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function imageLoad(file: File, title: string) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      store.dispatch(closeModal());
      console.log(store.getState().ui);
      store.dispatch(
        addAsset({
          traitId: store.getState().ui.traitMenu,
          src: e.target.result,
          name: title,
        }),
      );
    };
    reader.readAsDataURL(file);
  }

  if (isOpen) {
    return (
      <>
        <div className="fixed inset-0 z-10 w-screen h-screen backdrop-blur-sm">
          <div
            className="fixed inside-0 z-10 flex items-center justify-center 
          w-screen h-screen ">
            <div className="bg-palette-2 rounded-xl flex p-8 w-96">
              <FileUploadModal onLoad={imageLoad} />
            </div>
          </div>
        </div>
      </>
    );
  } else return <></>;
}
