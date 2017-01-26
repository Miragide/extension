import { getStoredState, persistStore } from 'redux-persist-immutable';
import reduxPersistTransform from '../lmem/reduxPersistTransform';
import storage from 'chrome-storage-local';

export default function (configure, callback) {
  const persistConfig = Object.assign(
    {
      transforms: [reduxPersistTransform],
      whitelist: ['prefs'],
      debounce: 0
    },
    chrome !== 'undefined' && chrome.storage && chrome.storage.local ?
      { storage } :
      {}
  );
  getStoredState(persistConfig, (err, initialState) => {
    const store = configure(initialState);
    persistStore(store, persistConfig, () => { callback(store); });
  });
}
