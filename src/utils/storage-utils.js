const getList = item => {
  const list = localStorage.getItem(item);
  return list ? JSON.parse(list) : [];
}

const addToList = (item, itemToAdd) => {
  try {
    const list = [...getList(item), itemToAdd];
    localStorage.setItem(item, JSON.stringify(list));
    return list;
  } catch (err) {
    console.log('An error occured while adding to list. Please try again');
  }
}

const updateList = (item, index, itemToReplace) => {
  try {
    let list = getList(item);
    list.splice(index, 1, itemToReplace);
    localStorage.setItem(item, JSON.stringify(list));
    return list;
  } catch (err) {
    console.log('An error occured while updating list. Please try again');
  }
}

const removeFromList = (item, id) => {
  try {
    const list = getList(item).filter(p => p.id !== id);
    localStorage.setItem(item, JSON.stringify(list));
    return list;
  } catch (err) {
    console.log('An error occured while updating list. Please try again');
  }
}

export {
  getList,
  addToList,
  updateList,
  removeFromList
}