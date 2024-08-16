import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, open, onOpen }) {
  if (!open) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => onOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h3 className="title">{title}</h3>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
