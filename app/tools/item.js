import api from "../services/api";

const editItem = (item, ownerState, editId, iItems) => {
  const [owner, setOwner] = ownerState;

  let items = iItems || [...owner.item_set];
  items.forEach((i) => {
    if (i.id === (editId || item.id)) {
      for (let k in i) {
        i[k] = item[k];
      }
    }
  });
  setOwner({ ...owner, item_set: items });

  editId || api.item.putItem(item);
};

const addItem = (title, ownerState, name) => {
  const [owner, setOwner] = ownerState;
  const newId = Math.round(Math.random() * 10 ** 10);
  const iItems = [{ title, id: newId, checked_by: null }, ...owner.item_set];
  setOwner({
    ...owner,
    item_set: iItems,
  });
  api.item.postItem({ title, [name]: owner.id }).then(({ data: i }) => {
    editItem(i, ownerState, newId, iItems);
  });
};

const deleteItems = (ids, ownerState) => {
  const [owner, setOwner] = ownerState;
  let items = [...owner.item_set];
  setOwner({ ...owner, item_set: items.filter((i) => !ids.includes(i.id)) });

  ids.forEach((id) => {
    api.item.deleteItem(id);
  });
};

export default {
  editItem,
  addItem,
  deleteItems,
};
