import { useState } from "react";
import { useStateContext } from "../../contexts/StateContext";
const VehiclesTemplate = () => {
  const [currentArticle, setCurrentArticle] = useState(1);
  const { vehiclesArray } = useStateContext();
  console.log("inside vehicle template: ", vehiclesArray);
  const {
    cargo_capacity,
    consumables,
    crew,
    length,
    manufacturer,
    max_atmosphering_speed,
    name,
    model,
    passengers,
  } = vehiclesArray[currentArticle - 1];

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
        <p>Length: {length}h</p>
        <p>Manufacturer: {manufacturer}days</p>
        <p>model: {model}</p>
        <p>Max atmospheric speed: {max_atmosphering_speed}km</p>
        <p>Crew: {crew}</p>
        <p>Passengers: {passengers}</p>
      </article>
      {vehiclesArray.length > 1 && (
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
          <span class="totalpages">{vehiclesArray.length}</span>
          <button
            class="multi-forward-btn"
            onClick={showNextArticle}
            disabled={currentArticle == vehiclesArray.length}
          >
            ▶
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default VehiclesTemplate;
