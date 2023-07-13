import { createSlice } from "@reduxjs/toolkit";

type PomodoroStateModel = {
  pomodoro: {
    taskSelected: string;
  };
};

const initialPomodoroState = {
  taskSelected: null,
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: initialPomodoroState,
  reducers: {
    setTaskSelected(state, action) {
      state.taskSelected = action.payload;
    },
  },
});

const pomodoroActions = pomodoroSlice.actions;

export { pomodoroActions, pomodoroSlice, PomodoroStateModel };
