import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../app/slices/appSlice";

type ProjectState = {
  employees: Employee[],
  project_id?: number

}

// Then, handle actions in your reducers:
const projectSlice = createSlice({
  name: "project",
  initialState: {
    employees: []
  
  } as ProjectState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setProject(state, action: PayloadAction<number>) {
      state.project_id = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    
  },
});

export default projectSlice;