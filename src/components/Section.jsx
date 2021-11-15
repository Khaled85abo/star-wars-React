import React from "react";
import RangeInput from "./sub-components/RangeInput";
import SvgSpinner from "./sub-components/SvgSpinner";

const Section = (props) => {
  const { list, totalPages, page, nextPage, previousPage, renderCharacter } =
    props;
  return (
    <section class="characters">
      <p>Characters</p>
      <div class="spinner-div hidden ul-loader">
        <SvgSpinner />
      </div>

      <ul>
        {list.map((el) => (
          <li key={el.name} onClick={renderCharacter}>
            {el.name}
          </li>
        ))}
      </ul>
      <div class="page-controller">
        <button class="back-btn" onClick={previousPage} disabled={page == 1}>
          ◀
        </button>
        <span>{page}</span>
        <span>/</span>
        <span class="totalpages">{totalPages}</span>
        <button
          class="forward-btn"
          onClick={nextPage}
          disabled={page == totalPages}
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default Section;
