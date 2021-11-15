import { useState, useEffect } from "react";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Section from "./components/Section";
import Svg from "./components/Svg";

function App() {
  const [showBothSections, setShowBothSections] = useState(false);
  const [totalPages, setTotalPages] = useState(5);
  const [selectedCharacter, setSelectedCharacter] = useState();
  const [planet, setPlanet] = useState();
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [state, setState] = useState({
    page: 1,
    peoples: [],
    charactersPerPage: 10,
  });

  const fetchCharacters = async () => {
    const fetchData = await fetch(
      `https://swapi.dev/api/people/?page=${state.page}`
    );
    const data = await fetchData.json();
    state.peoples = data.results;
    countPages(data.count);
    setList(data.results);
  };

  const countPages = (count) => {
    setTotalPages(Math.ceil(count / state.charactersPerPage));
  };

  const nextPage = () => {
    state.page++;
    fetchCharacters();
  };

  const previousPage = () => {
    state.page--;
    fetchCharacters();
  };

  const renderCharacter = (e) => {
    const lis = document.querySelectorAll(".active");
    if (lis.length > 0) {
      lis.forEach((li) => li.classList.remove("active"));
    }

    e.target.classList.add("active");
    const character = list.find((el) => el.name == e.target.innerText);
    setSelectedCharacter(character);
    renderPlanet(character.homeworld);
  };

  const renderPlanet = async (url) => {
    try {
      const fetchedData = await fetch(url);
      const data = await fetchedData.json();
      setPlanet(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <body>
      <div class="wrapper">
        <Header />
        <div class="container">
          <Svg />
          <Section
            list={list}
            totalPages={totalPages}
            page={state.page}
            nextPage={nextPage}
            previousPage={previousPage}
            renderCharacter={renderCharacter}
          />

          <Aside character={selectedCharacter} planet={planet} />
        </div>
      </div>
    </body>
  );
}

export default App;
