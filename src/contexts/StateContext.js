import { createContext, useContext, useReducer } from "react";
import {
  lOADING,
  ERROR,
  SET_CHAR,
  SET_PLANET,
  GET_PLANET,
  SET_PAGE_LIST,
  SET_PEOPLES_OBJ,
  INC_PAGE,
  DEC_PAGE,
  DATA_FETCHED,
  FETCH_PLANET,
} from "../constants";
const StateContext = createContext();
export function useStateContext() {
  return useContext(StateContext);
}

const stateReducer = (state, action) => {
  switch (action.type) {
    case DATA_FETCHED:
      return {
        ...state,
        count: action.payload.count,
        loading: false,
        list: action.payload.results,
        peoples: { ...state.peoples, [state.page]: action.payload.results },
        // using state.count instead of action.payload to count total pages return 0
        totalPages: Math.ceil(action.payload.count / state.charactersPerPage),
      };
    case SET_PAGE_LIST:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case SET_PEOPLES_OBJ:
      return {
        ...state,
        peoples: { ...state.peoples, [state.page]: action.payload },
      };
    case SET_CHAR:
      return {
        ...state,
        selectedCharacter: action.payload,
      };
    case SET_PLANET:
      return {
        ...state,
        planet: action.payload,
        planets: { ...state.planets, [action.key]: action.payload },
      };
    case INC_PAGE:
      console.log(state.page);
      return {
        ...state,
        loading: true,
        page: state.page++,
      };
    case DEC_PAGE:
      return {
        ...state,
        page: state.page--,
      };
    case lOADING:
      return {
        ...state,
        loading: true,
      };
  }
};

const initialState = {
  loading: false,
  peoples: {},
  list: [],
  planet: null,
  planets: {},
  vehicles: {},
  species: {},
  starships: {},
  selectedCharacter: null,
  totalPages: 5,
  page: 1,
  count: null,
  charactersPerPage: 10,
};

export function StateContextProvider({ children }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { list, planet, selectedCharacter, page, totalPages, loading } = state;

  const fetchCharacters = async () => {
    console.log("state page: ", state.page);
    console.log("page: ", page);
    dispatch({ type: lOADING });
    try {
      const fetchData = await fetch(
        `https://swapi.dev/api/people/?page=${state.page}`
      );
      const data = await fetchData.json();
      dispatch({ type: DATA_FETCHED, payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  };

  const nextPage = () => {
    // dispatch({ type: INC_PAGE });
    state.page++;
    state.peoples[state.page]
      ? dispatch({ type: SET_PAGE_LIST, payload: state.peoples[state.page] })
      : fetchCharacters();
  };

  const previousPage = () => {
    // dispatch({ type: DEC_PAGE });
    dispatch({ type: lOADING });
    state.page--;
    state.peoples[state.page]
      ? dispatch({ type: SET_PAGE_LIST, payload: state.peoples[state.page] })
      : fetchCharacters();
  };

  const renderCharacter = (e) => {
    const lis = document.querySelectorAll(".active");
    if (lis.length > 0) {
      lis.forEach((li) => li.classList.remove("active"));
    }

    e.target.classList.add("active");
    const character = list.find((el) => el.name === e.target.innerText);
    dispatch({ type: SET_CHAR, payload: character });
    renderPlanet(character.homeworld);
  };

  const renderPlanet = async (url) => {
    const num = url.split("/");
    const key = num[num.length - 2];
    if (state.planets[key]) {
      console.log("planet already exist");
      dispatch({ type: SET_PLANET, payload: state.planets[key], key: key });
    } else {
      try {
        const fetchedData = await fetch(url);
        const data = await fetchedData.json();
        dispatch({ type: SET_PLANET, payload: data, key: key });
      } catch (error) {
        dispatch({ type: ERROR, payload: error });
      }
    }
  };

  const values = {
    ...state,
    fetchCharacters,
    renderPlanet,
    renderCharacter,
    nextPage,
    previousPage,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}
