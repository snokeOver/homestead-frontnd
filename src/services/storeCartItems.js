const cartStorageName = "cart-storage";

// check wherether the id is already in the storage
const getPropertyIds = () => {
  const currentIds = localStorage.getItem(cartStorageName);
  if (currentIds) return JSON.parse(currentIds);
  else return [];
};

// delete the Id from the localstorage
const deletePropertyId = (id) => {
  const result = getPropertyIds();
  if (result.includes(id)) {
    let newPropArr = result.filter((itemId) => itemId !== id);
    localStorage.setItem(cartStorageName, JSON.stringify(newPropArr));
  }
};

// delete the Id from the localstorage
const deleteAllPropertyIds = () => {
  localStorage.removeItem(cartStorageName);
};

// Store the property Ids if it is not in the storage
const storePropertyId = (id) => {
  const result = getPropertyIds();
  if (!result.includes(id)) {
    result.push(id);
    localStorage.setItem(cartStorageName, JSON.stringify(result));
  }
};

export {
  getPropertyIds,
  storePropertyId,
  deletePropertyId,
  deleteAllPropertyIds,
};
