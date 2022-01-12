import { useState } from "react";
import { useStateContext } from "../../contexts/StateContext";
const StarshipsTemplate = () => {
  const { starshipsArray } = useStateContext();
  const [currentArticle, setCurrentArticle] = useState(1);

  const {
    MGLT,
    cargo_capacity,
    consumables,
    crew,
    length,
    manufacturer,
    max_atmosphering_speed,
    model,
    passengers,
    starship_class,
    name,
  } = starshipsArray[currentArticle - 1];

  const showPrevArticle = () => {
    setCurrentArticle(currentArticle - 1);
  };
  const showNextArticle = () => {
    setCurrentArticle(currentArticle + 1);
  };
  return (
    <div>
      <article>
        <h5>{name}</h5>
        <p>Starship class: {starship_class}</p>
        <p>Langth: {length}</p>
        <p>Manufacturer: {manufacturer}</p>
        <p>Model: {model}km</p>
        <p>Passengers: {passengers}</p>
        <p>Crew: {crew}</p>
        <p>Consumable: {consumables}</p>
      </article>
      {starshipsArray.length > 1 && (
        <div class="multi-div">
          <button
            class="multi-back-btn"
            onClick={showPrevArticle}
            disabled={currentArticle == 1}
          >
            ◀
          </button>
          <span>{currentArticle}</span>
          <span>/</span>
          <span class="totalpages">{starshipsArray.length}</span>
          <button
            class="multi-forward-btn"
            onClick={showNextArticle}
            disabled={currentArticle == starshipsArray.length}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default StarshipsTemplate;
