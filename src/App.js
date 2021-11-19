import { useEffect, useReducer } from "react";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Section from "./components/Section";
import Svg from "./components/Svg";
import { useStateContext } from "./contexts/StateContext";
function App() {
  const { fetchCharacters } = useStateContext();

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <body>
      <div class="wrapper">
        <Header />
        <div class="container">
          <Svg />
          <Section />
          <Aside />
        </div>
      </div>
    </body>
  );
}

export default App;
