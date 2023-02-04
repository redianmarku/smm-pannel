import { set } from "./servicesSlice";

const servicesReducer = (state, action) => {
  switch (action.type) {
    case set.type:
      return {
        ...state,
        services: action.payload,
      };
    default:
      return state;
  }
};

export default servicesReducer;
