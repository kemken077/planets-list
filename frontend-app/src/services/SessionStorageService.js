function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch(e) {
    return (
      e instanceof DOMException &&
      // Everything except Firefox.
      (e.keyCode === 22 ||
        // Firefox
        e.keyCode === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        storage &&
        storage.length !== 0
    );
  }
}

export default function isStorageAvailable(type) {
  return storageAvailable(type);
}
