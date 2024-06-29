import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initalItems } from "../lib/constants";

export const useItemsStore = create(
  persist(
    (set) => ({
      items: initalItems,
      addItem: (newItemText) => {
        set((state) => {
          const newItem = {
            id: state.items.length + 1,
            name: newItemText,
            packed: false,
          };
          return { items: [...state.items, newItem] };
        });
      },
      deleteItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return { items: newItems };
        });
      },
      toggleItem: (id) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return { ...item, packed: !item.packed };
            }
            return item;
          });
          return { items: newItems };
        });
      },
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetToInitial: () => {
        set(() => ({ items: initalItems }));
      },
      markAllAsComplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: true,
          }));
          return { items: newItems };
        });
      },
      markAllAsIncomplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: false,
          }));
          return { items: newItems };
        });
      },
    }),
    { name: "items" }
  )
);
