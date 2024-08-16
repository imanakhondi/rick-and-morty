import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

function CharacterDetail({
  selectedIdCharacter,
  onAddFavourite,
  isAddToFavourite,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function getCharacter() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedIdCharacter}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((episode) =>
          episode.split("/").at(-1)
        );
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );

        setEpisodes(episodeData.slice(0, 6));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedIdCharacter) getCharacter();
  }, [selectedIdCharacter]);

  if (isLoading)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        <Loader />
      </div>
    );

  if (!character || !selectedIdCharacter)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        Please Select a Character
      </div>
    );

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddToFavourite={isAddToFavourite}
        onAddFavourite={onAddFavourite}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isAddToFavourite, onAddFavourite }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          &nbsp;{character.status} - {character.species}
        </div>
        <div className="location">
          <p>Last Known Location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourite ? (
            <p>Already Added to Favourite ✅ </p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourite(character)}
            >
              Add to Favourites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.air_date) - new Date(b.air_date)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.air_date) - new Date(a.air_date)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">
              {new Date(item.air_date).toLocaleDateString("en-UA", {
                month: "long",
                year: "numeric",
                day: "numeric",
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
