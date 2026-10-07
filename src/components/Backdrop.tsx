/** Fixed, slowly drifting colour field behind the whole page. Pure CSS, transform-only. */
export function Backdrop() {
  return (
    <div aria-hidden className="aurora no-print">
      <i />
      <i />
      <i />
    </div>
  );
}
