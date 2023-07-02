import { useItemsContext } from "../hooks/useItemsContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ItemDetails = ({ item }) => {
  const { dispatch } = useItemsContext();

  const handleClick = async () => {
    const response = await fetch("/api/items/" + item._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ITEM", payload: json });
    }
  };

  const handlePatch = async () => {
    const update = await fetch("/api/items/" + item._id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: item.count + 1 }),
    });
    const json = await update.json();

    if (update.ok) {
      dispatch({ type: "UPDATE_ITEM", payload: json });
    }
  };
  const handlePatch2 = async () => {
    if (item.count >= 1) {
      const update = await fetch("/api/items/" + item._id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: item.count - 1 }),
      });
      const json = await update.json();

      if (update.ok) {
        dispatch({ type: "UPDATE_ITEM", payload: json });
      }
    }
  };

  return (
    <div className="item-details">
      <h4>{item.title}</h4>
      <p>
        <strong>Count: </strong>
        {item.count}
      </p>
      <p>
        <strong>Description: </strong>
        {item.description}
      </p>
      <p>
        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
      </p>
      <button onClick={handlePatch}>+</button>
      <button onClick={handlePatch2}>-</button>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ItemDetails;
