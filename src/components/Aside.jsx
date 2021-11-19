import React from "react";
import SvgSpinner from "./sub-components/SvgSpinner";
import Planet from "./templates/Planet";
import CharArticle from "./templates/CharArticle";
import { useStateContext } from "../contexts/StateContext";
const Aside = () => {
  const { selectedCharacter, planet } = useStateContext();
  return (
    <aside>
      <p>Details</p>
      <div class="spinner-div hidden details">
        <SvgSpinner />
      </div>
      <div class="selectedCharacter-details">
        {selectedCharacter && <CharArticle character={selectedCharacter} />}
      </div>

      <section class="extra-info">
        <div class="btns">
          <input
            type="radio"
            id="radio-1"
            name="tabs"
            data-type="planet"
            checked
            onClick={(e) => console.log(e.target.dataset.type)}
          />
          <label for="radio-1" class="tab">
            Planet
          </label>
          <input
            type="radio"
            id="radio-2"
            name="tabs"
            data-type="species"
            onClick={(e) => console.log(e.target.dataset.type)}
          />
          <label for="radio-2" class="tab">
            Species
          </label>
          <input
            type="radio"
            id="radio-3"
            name="tabs"
            data-type="vehicles"
            onClick={(e) => console.log(e.target.dataset.type)}
          />
          <label for="radio-3" class="tab">
            Vehicles
          </label>
          <input
            type="radio"
            id="radio-4"
            name="tabs"
            data-type="starships"
            onClick={(e) => console.log(e.target.dataset.type)}
          />
          <label for="radio-4" class="tab">
            Starships
          </label>
        </div>

        <div class="spinner-div hidden extraInfo">
          <SvgSpinner />
        </div>
        <div class="article">{planet && <Planet planet={planet} />}</div>
      </section>
    </aside>
  );
};

export default Aside;
