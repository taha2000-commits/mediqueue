type State = {
  slotDuration: string;
  bufferTime: string;
  workingHours: {
    start: string;
    end: string;
  };
  breakHours: {
    start: string;
    end: string;
  };
  periodType: "am" | "pm";
};

export const reducer: (
  state: State,
  action: {
    type:
      | "SET_SLOT_DURATION"
      | "SET_BUFFER_TIME"
      | "SET_WH_START"
      | "SET_WH_END"
      | "SET_BH_START"
      | "SET_BH_END"
      | "SET_PERIOD_TYPE"
      | "RESET";
    payload: string;
    initState?: State;
  },
) => State = (state, { type, payload, initState }) => {
  switch (type) {
    case "SET_SLOT_DURATION":
      return {
        ...state,
        slotDuration: payload,
      };
    case "SET_BUFFER_TIME":
      return {
        ...state,
        bufferTime: payload,
      };
    case "SET_WH_START":
      return {
        ...state,
        workingHours: { ...state.workingHours, start: payload },
      };
    case "SET_WH_END":
      return {
        ...state,
        workingHours: { ...state.workingHours, end: payload },
      };
    case "SET_BH_START":
      return {
        ...state,
        breakHours: { ...state.breakHours, start: payload },
      };
    case "SET_BH_END":
      return {
        ...state,
        breakHours: { ...state.breakHours, end: payload },
      };
    case "SET_PERIOD_TYPE":
      return {
        ...state,
        periodType: payload as "am" | "pm",
      };
    case "RESET":
      return initState!;

    default:
      return state;
  }
};
