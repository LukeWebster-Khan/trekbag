export default function Counter({ numberOfItems, numberOfItemsPacked }) {
  return (
    <p>
      <b>{numberOfItemsPacked}</b> / {numberOfItems} items packed
    </p>
  );
}
