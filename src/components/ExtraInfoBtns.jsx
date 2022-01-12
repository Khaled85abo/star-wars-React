const ExtraInfoBtns = ({ handleExtraInfoBtn, extraInfoType }) => {
  return (
    <div class="btns">
      <input
        type="radio"
        id="radio-1"
        name="tabs"
        data-type="planet"
        checked={extraInfoType == "planet"}
        onClick={() => handleExtraInfoBtn("planet")}
      />
      <label for="radio-1" class="tab">
        Planet
      </label>
      <input
        type="radio"
        id="radio-2"
        name="tabs"
        data-type="species"
        checked={extraInfoType == "species"}
        onClick={() => handleExtraInfoBtn("species")}
      />
      <label for="radio-2" class="tab">
        Species
      </label>
      <input
        type="radio"
        id="radio-3"
        name="tabs"
        data-type="vehicles"
        checked={extraInfoType == "vehicles"}
        onClick={() => handleExtraInfoBtn("vehicles")}
      />
      <label for="radio-3" class="tab">
        Vehicles
      </label>
      <input
        type="radio"
        id="radio-4"
        name="tabs"
        data-type="starships"
        checked={extraInfoType == "starships"}
        onClick={() => handleExtraInfoBtn("starships")}
      />
      <label for="radio-4" class="tab">
        Starships
      </label>
    </div>
  );
};

export default ExtraInfoBtns;
