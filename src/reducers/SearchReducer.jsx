export const initialState = {
  query: "",
  type: "",
  movies: [],
  page: 1,
  totalResults: 0,
  loading: false,
  error: "",
};

// Reducer implementation
export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, page: 1, movies: [] };
    case "SET_TYPE":
      return { ...state, type: action.payload, page: 1, movies: [] };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "FETCH_MOVIES_START":
      return { ...state, loading: true, error: "" };
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload.movies,
        totalResults: action.payload.totalResults,
        loading: false,
      };
    case "LOAD_MORE_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...action.payload.movies],
        loading: false,
      };
    case "FETCH_MOVIES_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
