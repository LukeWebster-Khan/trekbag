import { useMemo, useState } from "react";

import Select from "react-select";

import EmptyView from "./EmptyView";

import { useItemsStore } from "../stores/itemsStore";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("default");

  const items = useItemsStore((state) => state.items);
  const handleToggle = useItemsStore((state) => state.toggleItem);
  const handleDeleteItem = useItemsStore((state) => state.handleDeleteItem);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "packed") {
          return b.packed - a.packed;
        }
        if (sortBy == "unpacked") {
          return a.packed - b.packed;
        }
        return;
      }),
    [items, sortBy]
  );
  const sortingOptions = [
    { value: "default", label: "Sort by default" },
    { value: "name", label: "Sort by name" },
    { value: "packed", label: "Sort by Packed" },
    { value: "unpacked", label: "Sort by Unpacked" },
  ];
  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={(option) => setSortBy(option.value)}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      ) : null}
      {sortedItems.map((item) => (
        <Item
          onToggle={handleToggle}
          onDeleteItem={handleDeleteItem}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
}

const Item = ({ item, onToggle, onDeleteItem }) => {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => onToggle(item.id)}
          checked={item.packed}
          type="checkbox"
        />
        {item.name}
      </label>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};
