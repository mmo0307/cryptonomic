import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from '@app/app';
import { MetaMaskContextProvider } from '@shared/lib/hooks/use-meta-mask';
import store from '@store/app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MetaMaskContextProvider>
  </React.StrictMode>
);
