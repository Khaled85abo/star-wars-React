import { useState } from "react";
import { useStateContext } from "../../contexts/StateContext";

const SpeciesTemplate = () => {
  const [currentArticle, setCurrentArticle] = useState(1);
  const { speciesArray } = useStateContext();

  const {
    average_height,
    average_lifespan,
    classification,
    eye_colors,
    hair_colors,
    language,
    skin_colors,
    name,
  } = speciesArray[currentArticle - 1];
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
        <p>Average height: {average_height}h</p>
        <p>Language: {language}</p>
        <p>Classification: {classification}</p>
        <p>Average lifespan: {average_lifespan}km</p>
        <p>Skin colors: {skin_colors}</p>
        <p>Hair colors: {hair_colors}</p>
        <p>Eye colors: {eye_colors}</p>
      </article>
      {speciesArray.length > 1 && (
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
          <span class="totalpages">{speciesArray.length}</span>
          <button
            class="multi-forward-btn"
            onClick={showNextArticle}
            disabled={currentArticle == speciesArray.length}
          >
            ▶
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default SpeciesTemplate;
