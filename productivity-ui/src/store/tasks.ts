import { createSlice } from "@reduxjs/toolkit";
import { Goal } from "../models/goal-models";

type TasksStateModel = {
  tasks: {
    goals: Goal[];
    highlightedGoal: string;
  };
};

const initialTasksState = {
  goals: [],
  highlightedGoal: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    setTasks(state, action) {
      const goalTasks = action.payload.filter((task: { type: string }) => {
        return task.type === "GOAL";
      });

      state.goals = goalTasks;
    },
    setHighlightedGoal(state, action) {
      state.highlightedGoal = action.payload;
    },
    removeHighlightedGoal(state, action) {
      state.highlightedGoal = null;
    },
  },
});

const tasksActions = tasksSlice.actions;

export { tasksActions, tasksSlice, TasksStateModel };
