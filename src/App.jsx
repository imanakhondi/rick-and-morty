import {  useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorite, Result, SearchResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacter(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);
  const [selectedIdCharacter, setSelectedIdCharacter] = useState();


  const handleAddToFavourite = (character) => {
    setFavourites((prevFavourite) => [...prevFavourite, character]);
  };

  const handleDeleteFavourite = (id) => {
    setFavourites((prevFavourite) =>
      prevFavourite.filter((item) => item.id !== id)
    );
  };

  const isAddToFavourite = favourites
    .map((fav) => fav.id)
    .includes(selectedIdCharacter);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Result query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorite
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          selectedIdCharacter={selectedIdCharacter}
          isLoading={isLoading}
          onSelectCharacter={(id) =>
            setSelectedIdCharacter((prevId) => (prevId === id ? null : id))
          }
        />
        <CharacterDetail
          selectedIdCharacter={selectedIdCharacter}
          onAddFavourite={handleAddToFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
