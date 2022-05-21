import { closeModal } from '@/features/uiSlice';
import { UIState } from 'interfaces/UI';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';

export default function Modal({ modalName, onData, children }: any) {
  const store = useStore<{ ui: UIState }>();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Object | null>(null);

  store.subscribe(() => {
    let open = store.getState().ui.openModals.includes(modalName);
    setIsOpen(open);
    if (open) {
      setData(store.getState().ui.modalContent[modalName]);
      onData(store.getState().ui.modalContent[modalName]);
    }
  });

  function _closeModal() {
    store.dispatch(closeModal(modalName));
    setIsOpen(false);
    //TODO : setData
    setData(null);
  }
  function handleKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'Escape' &&
      store.getState().ui.openModals.includes(modalName)
    ) {
      _closeModal();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', e => handleKeyDown(e));
      return () => {
        document.removeEventListener('keydown', e => handleKeyDown(e));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (isOpen) {
    return (
      <>
        <div className="fixed inset-0 z-10 w-screen h-screen backdrop-blur-sm">
          <div
            className="fixed inside-0 z-10 flex items-center justify-center 
          w-screen h-screen ">
            <div className="bg-palette-2 rounded-xl flex p-8 w-96">
              {children}
            </div>
          </div>
        </div>
      </>
    );
  } else return <></>;
}
