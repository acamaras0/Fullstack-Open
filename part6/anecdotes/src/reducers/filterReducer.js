export const filter = (filter) => ({
  type: "FILTER",
  filter,
});

const filterReducer = (state = null, action) => {
  switch (action.type) {
    case "FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
