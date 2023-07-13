import { configureStore } from "@reduxjs/toolkit";
import { tasksActions, tasksSlice } from "./tasks";
import { pomodoroActions, pomodoroSlice } from "./pomodoro";
import { authActions, authSlice } from "./auth";

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    pomodoro: pomodoroSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;

export { tasksActions, pomodoroActions, authActions };
