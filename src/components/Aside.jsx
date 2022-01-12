import { useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import SvgSpinner from "./sub-components/SvgSpinner";
import PlanetTempate from "./templates/PlanetTemplate";
import CharacterTemplate from "./templates/CharacterTemplate";
import ExtraInfoBtns from "./ExtraInfoBtns";
import VehiclesTemplate from "./templates/VehiclesTemplate";
import StarshipsTemplate from "./templates/StarshipsTemplate";
import SpeciesTemplate from "./templates/SpeciesTemplate";

const Aside = () => {
  const {
    selectedCharacter,
    planet,
    vehiclesArray,
    starshipsArray,
    speciesArray,
    renderExtraInfo,
  } = useStateContext();
  const [extraInfoType, setExtraInfoType] = useState("planet");
  const handleExtraInfoBtn = (type) => {
    setExtraInfoType(type);
    renderExtraInfo(type);
  };

  return (
    <aside>
      <p>Details</p>
      <div class="spinner-div hidden details">
        <SvgSpinner />
      </div>
      <div class="selectedCharacter-details">
        {selectedCharacter && (
          <CharacterTemplate character={selectedCharacter} />
        )}
      </div>
      <section class="extra-info">
        <ExtraInfoBtns
          handleExtraInfoBtn={handleExtraInfoBtn}
          extraInfoType={extraInfoType}
        />

        <div class="spinner-div hidden extraInfo">
          <SvgSpinner />
        </div>
        <div class="article">
          {extraInfoType == "planet" && planet ? (
            <PlanetTempate planet={planet} />
          ) : extraInfoType == "vehicles" && vehiclesArray.length > 0 ? (
            <VehiclesTemplate />
          ) : extraInfoType == "starships" && starshipsArray.length > 0 ? (
            <StarshipsTemplate />
          ) : (
            speciesArray.length > 0 && <SpeciesTemplate />
          )}
        </div>
      </section>
    </aside>
  );
};

export default Aside;
