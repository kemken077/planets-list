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

function isStorageAvailable(type) {
  return storageAvailable(type);
}

export function isDataStoragePopulated(type, searchItem = 'planets') {
  let areItemsAvailable;
  if (isStorageAvailable(type)) {
    const storedItems = sessionStorage.getItem(searchItem);
    if (storedItems) {
      var storedArrayLength = storedItems.length;
    }
    const arrayLengthLargerThanZero = storedArrayLength > 0;
    if (arrayLengthLargerThanZero) {
      areItemsAvailable = true;
    } else {
      areItemsAvailable = false;
    }
  }
  return areItemsAvailable;
}
