import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getEmployees from "../../api/getEmployees";
import { getAllProjects, getProjectsByUser } from "../../api/getProjects";

type AppState = {
  impersonateUser?: Employee;
  employees: Employee[];
  projects: Project[];
};

export type Employee = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};

export type Project = {
  id: number;
  project_name: string;
  employees?: number[];
}

// First, create the thunk
export const fetchEmployees: any = createAsyncThunk(
  "employees/fetch",
  async (data, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getEmployees(
      state.authentication.jwtIdToken
    );
  }
);

//Thunk för project. Gör anrop mot databasen och hämtar datan när den ropas på.
export const fetchProjectsByUser: any = createAsyncThunk(
  "projects/fetch",
  async (user: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getProjectsByUser(
      state.authentication.jwtIdToken,
      user.email
    );
  }
);

//DOING - hämta alla projekt i state när man är inloggad som admin
export const fetchAllProjects: any = createAsyncThunk(
  "projects/fetch",
  async (data, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getAllProjects(
      state.authentication.jwtIdToken,
    );
  }
);

// Then, handle actions in your reducers:
const appSlice = createSlice({
  name: "app",
  initialState: { employees: [], projects: [] } as AppState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setImpersonateUser(state, action: PayloadAction<Employee>) {
      // TODO , borde man "tömma" timreReport/transaction-statet här? 
      state.impersonateUser = action.payload;
    },
  },
  extraReducers: {
    [fetchEmployees.fulfilled]: (state, action) => {
      state.employees = action.payload;
    },
    [fetchEmployees.pending]: (state, action) => {
    },
    [fetchProjectsByUser.fulfilled]: (state, action) => {
      state.projects = action.payload;
    },
    [fetchAllProjects.fulfilled]: (state, action) => {

      //DOING 
    //   let group = action.payload.reduce((projects: any, project: any) => {
    //     console.log("project", project);
    //     console.log('projects', projects);
    //     projects[project.project_name] = [...projects[project.project_name] || [], project];
    //     console.log("I projects arrayen ", projects);
    //     return projects;
    //     }, {});

    //  console.log("loggar group: ", group);
     
    //   group.filter()
    //   // Hämtar ut all data för projekt 1
    //   const firstProject = action.payload.filter((project :any) => project.project_id === 1);

    //   // Hämtar ut alla anställda för projekt 1
    //   const employeesInFirstProject = firstProject.map(((project: any) => project.employee_id));
    //   console.log("loggar project 1s anställda: ", employeesInFirstProject);
      
      state.projects = action.payload;
    }
  },
});

export default appSlice.reducer;
export const { setImpersonateUser } = appSlice.actions;
