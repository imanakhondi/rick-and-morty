import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  AXIOS
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => setCharacters(data.results.slice(0, 5)))
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => setIsLoading(false));
  }, []);

  // useEffect(() => {
  //   async function getCharacters() {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(
  //         "https://rickandmortyapi.com/api/character"
  //       );
  //       setCharacters(data.results.slice(0, 4));
  //       setIsLoading(false);
  //     } catch (err) {
  //       toast.error(err.response.data.error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getCharacters();
  // }, []);

  // FETCH
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Something went wrong!!");
  //       return res.json();
  //     })
  //     .then((data) => setCharacters(data.results.slice(0, 5)))
  //     .catch((err) => toast.error(err.message))
  //     .finally(() => setIsLoading(false));
  // }, []);

  // useEffect(() => {
  //   async function getCharacters() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character1");
  //       if (!res.ok) throw new Error("Something went wrong");
  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 4));
  //       setIsLoading(false);
  //     } catch (err) {
  //       toast.error(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getCharacters();
  // }, []);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
