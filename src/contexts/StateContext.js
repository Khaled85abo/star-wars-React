import { createContext, useContext, useReducer } from "react";
import {
  lOADING,
  ERROR,
  SET_CHAR,
  SET_PLANET,
  SET_PAGE_LIST,
  SET_PEOPLES_OBJ,
  INC_PAGE,
  DEC_PAGE,
  DATA_FETCHED,
  SET_VEHICLE,
  SET_VEHICLESARRAY,
  SET_STARSHIP,
  SET_STARSHIPSARRAY,
  SET_SPECIE,
  SET_SPECIESARRAY,
} from "../constants";
import * as api from "../api";
import getNumber from "../functions";
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
    case SET_VEHICLE:
      return {
        ...state,
        // vehicles: { ...vehicles, [action.key]: action.payload },
      };
    case SET_VEHICLESARRAY:
      return {
        ...state,
        vehiclesArray: action.payload,
      };
    case SET_SPECIE:
      return {
        ...state,
        // species: { ...species, [action.key]: action.payload },
      };
    case SET_SPECIESARRAY:
      return {
        ...state,
        speciesArray: action.payload,
      };
    case SET_STARSHIP:
      return {
        ...state,

        // starships: { ...starships, [action.key]: action.payload },
      };
    case SET_STARSHIPSARRAY:
      return {
        ...state,
        starshipsArray: action.payload,
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
  vehiclesArray: [],
  species: {},
  speciesArray: {},
  starships: {},
  starshipsArray: {},
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
      const data = await api.fetchPeople(state.page);
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
    renderExtraInfo("planet");
  };

  const renderExtraInfo = (type) => {
    console.log(type);
    if (!state.selectedCharacter) {
      return;
    }
    switch (type) {
      case "planet":
        renderPlanet(state.selectedCharacter.homeworld);
        break;
      case "starships":
        renderStarships(state.selectedCharacter[type]);
        break;
      case "species":
        renderSpecies(state.selectedCharacter[type]);
        break;
      case "vehicles":
        renderVehicles(state.selectedCharacter[type]);
        break;
    }
  };

  const renderPlanet = async (url) => {
    const key = getNumber(url);
    if (state.planets[key]) {
      dispatch({ type: SET_PLANET, payload: state.planets[key], key: key });
    } else {
      try {
        const data = await api.fetchPlanet(key);
        dispatch({ type: SET_PLANET, payload: data, key: key });
      } catch (error) {
        dispatch({ type: ERROR, payload: error });
      }
    }
  };
  const renderVehicles = async (urls) => {
    console.log(urls);
    let vehicles = [];
    for (let url of urls) {
      const key = getNumber(url);
      if (state.vehicles[key]) {
        vehicles.push(state.vehicles[key]);
      } else {
        try {
          const data = await api.fetchVehicles(key);
          vehicles.push(data);
          dispatch({ type: SET_VEHICLE, payload: data, key });
        } catch (error) {
          dispatch({ type: ERROR, payload: error });
        }
      }
    }
    console.log("vehicles array: ", vehicles);
    dispatch({ type: SET_VEHICLESARRAY, payload: vehicles });
  };

  const renderStarships = async (urls) => {
    const starshipsArr = [];
    for (let url of urls) {
      const key = getNumber(url);
      if (state.vehicles[key]) {
        starshipsArr.push(state.starships[key]);
      } else {
        try {
          const data = await api.fetchStarships(key);
          starshipsArr.push(data);
          dispatch({ type: SET_STARSHIP, payload: data, key });
        } catch (error) {
          dispatch({ type: ERROR, payload: error });
        }
      }
    }
    // console.log("fetch starships: ", starshipsArr);
    dispatch({ type: SET_STARSHIPSARRAY, payload: starshipsArr });
  };

  const renderSpecies = async (urls) => {
    let species = [];
    for (let url of urls) {
      const key = getNumber(url);
      if (state.species[key]) {
        species.push(state.species[key]);
      } else {
        try {
          const data = await api.fetchSpecies(key);
          species.push(data);
          dispatch({ type: SET_SPECIE, payload: data, key });
        } catch (error) {
          dispatch({ type: ERROR, payload: error });
        }
      }
    }
    dispatch({ type: SET_SPECIESARRAY, payload: species });
  };

  const values = {
    ...state,
    fetchCharacters,
    renderExtraInfo,
    renderCharacter,
    nextPage,
    previousPage,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}
