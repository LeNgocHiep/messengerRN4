import * as ActionTypes from "../utils/action_type";

const isLoading = (bool, text) => {
    return {
      type: ActionTypes.IS_LOADING,
      isLoading: bool,
      content: text,
    };
  };

  export default isLoading;