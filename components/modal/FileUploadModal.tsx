/* eslint-disable @next/next/no-img-element */
import { addAsset, removeAsset, updateAsset } from '@/features/assetSlice';
import readImage from '@/features/images';
import { closeModal } from '@/features/uiSlice';
import Asset from 'interfaces/Asset';
import { UIState } from 'interfaces/UI';
import { FormEvent, LegacyRef, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import Button from '../buttons/Button';
import Modal from './Modal';

export default function FileUploadModal() {
  const store = useStore<{ ui: UIState; assets: Asset[] }>();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [assetId, setAssetId] = useState(null);
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState('');
  const title = useRef<HTMLInputElement>(null);
  const label = useRef<HTMLLabelElement>(null);

  const onChange = async (e: any) => {
    if (!e || e === null) return;
    setFile(e.target.files[0]);
    setImage(await readImage(e.target.files[0]));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !title.current) return;
    if (file) imageLoad(file, title.current.value);
    else if (image) imageLoad(image, title.current.value);
  };

  const updateData = (data: any) => {
    if (data) {
      setAssetId(data.assetId);
      const asset = store.getState().assets.find(a => a.id === data.assetId);
      if (asset) {
        setImage(asset.src ?? '');
        setName(asset.name ?? '');
      }
    } else {
      setAssetId(null);
      setImage('');
      setName('');
    }
  };

  function imageLoad(file: File | string, title: string) {
    const reader = new FileReader();
    const dispatch = (res: string) => {
      store.dispatch(closeModal('fileUpload'));
      if (assetId)
        store.dispatch(updateAsset({ id: assetId, src: res, name: title }));
      else
        store.dispatch(
          addAsset({
            traitId: store.getState().ui.traitMenu,
            src: res,
            name: title,
          }),
        );
    };
    reader.onload = (e: any) => {
      dispatch(e.target.result);
    };
    if (typeof file !== 'string') reader.readAsDataURL(file);
    else dispatch(image);
  }

  function _deleteAsset() {
    if (assetId) store.dispatch(removeAsset(assetId));
    updateData(null);
    store.dispatch(closeModal('fileUpload'));
  }

  return (
    <Modal modalName="fileUpload" onData={updateData}>
      <div className="w-full">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center gap-6 ">
          <div className="flex flex-row gap-2 justify-center items-center">
            <input
              className="w-32 max-w-64 text-palette-4 font-semibold
          focus:bg-palette-2 bg-transparent focus:outline-0 py-5 
          h-14 text-center rounded-md text-[24px] cursor-pointer"
              ref={title}
              defaultValue={name || 'New asset'}></input>
            <svg
              onClick={() => {
                title?.current?.focus();
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer"
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
          </div>{' '}
          <div className="w-full relative h-max flex justify-center">
            {image && (
              <>
                <svg
                  onClick={() => {
                    setImage('');
                    setFile(null);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 
                  2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 
                  2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 
                  1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <img
                  className="w-[250px] h-[250px] object-contain"
                  src={image}
                  alt="preview"
                />
              </>
            )}
            {!image && (
              <>
                <input
                  type="file"
                  id="fileUpload"
                  className="absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer "
                  onChange={onChange}
                  max={1}
                  accept="image/png"
                />
                <label
                  ref={label as LegacyRef<HTMLLabelElement>}
                  htmlFor="fileUpload"
                  className="flex flex-col items-center justify-center 
                border-dotted border-4 border-palette-4 relative
                 w-full h-32 rounded-xl cursor-pointer
              hover:bg-palette-1 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 
                    6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 
                    01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 
                    6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Upload File
                </label>
              </>
            )}
          </div>
          <div className="flex max-w-full flex-row gap-2 justify-center items-center">
            <Button onClick={onSubmit}>{assetId ? 'Edit' : 'Add'}</Button>
            {assetId && (
              <Button type="cta" onClick={_deleteAsset}>
                Delete
              </Button>
            )}
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {success && <p>Success!</p>}
        {error && <p>Error: {error}</p>}
        {uploaded && <p>Uploaded!</p>}
      </div>
    </Modal>
  );
}
