import React, { useEffect, Suspense } from "react";
// import Aside from "./components/Aside";
import Header from "./components/Header";
import Section from "./components/Section";
import Svg from "./components/Svg";
import { useStateContext } from "./contexts/StateContext";
// Lazy loading https://reactjs.org/docs/code-splitting.html
const Aside = React.lazy(() => import("./components/Aside"));

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
          <Suspense fallback={<div>...Loading</div>}>
            <Aside />
          </Suspense>
        </div>
      </div>
    </body>
  );
}

export default App;
