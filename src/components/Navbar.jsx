import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}

export function Result({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-field"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result ">Found {numOfResult} characters</div>;
}

export function Favorite({ favourites, onDeleteFavourite }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Modal
        title="List of Favourite..."
        open={isOpenModal}
        onOpen={setIsOpenModal}
      >
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button
        className="heart"
        onClick={() => setIsOpenModal((isOpen) => !isOpen)}
      >
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
