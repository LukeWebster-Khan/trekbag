import { useState, useRef } from "react";

import Button from "./Button";

export default function AddItemForm({ onAddItem }) {
  const [itemText, setItemText] = useState("");

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemText) {
      alert("Please enter an item");
      inputRef.current.focus();
      return;
    }
    onAddItem(itemText);
    setItemText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        onChange={(e) => setItemText(e.target.value)}
        value={itemText}
        autoFocus
      />
      <Button>Add to list</Button>
    </form>
  );
}
