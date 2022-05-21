import FileUploadModal from '@/components/modal/FileUploadModal';
import assetSlice from '@/features/assetSlice';
import traitSlice from '@/features/traitSlice';
import uiSlice from '@/features/uiSlice';
import { configureStore } from '@reduxjs/toolkit';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../styles/globals.css';

const store = configureStore({
  reducer: {
    assets: assetSlice,
    traits: traitSlice,
    ui: uiSlice,
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <FileUploadModal />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
