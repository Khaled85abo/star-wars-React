import React from "react";

const RangeInput = () => {
  return (
    <div class="range-input">
      <input
        type="range"
        id="volume"
        name="volume"
        min="2"
        max="10"
        value="6"
      />
    </div>
  );
};

export default RangeInput;
