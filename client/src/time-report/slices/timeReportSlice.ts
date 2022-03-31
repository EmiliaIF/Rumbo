import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTimeReportsByUser, getTimeReportsMeta, postTimeReport, deleteTimeReport, getTimeReportsByProject, updateTimeReport } from "../../api/crudTimeReport";

// importera från types
import { TimeReport, DateFilter } from "../../types/index";

// create fetch TimeReport + TimreReportMeta
// jwtToken: string, email: string, year?: number, month?: number

// TODO skapa fetchTimeReportsByProject samt reducer som uppdaterar statet med den fetchade datan (.fullfilled)
export const fetchTimeReportsByProject: any = createAsyncThunk(
  "timereport/fetch",
  async (project: any, thunkAPI) => {
    const state: any = thunkAPI.getState();

    return await getTimeReportsByProject(
      state.authentication.jwtIdToken,
      project.id,
      state.timeReport.filter.year,
      state.timeReport.filter.month,
    )
  }
);

export const fetchTimeReportsByUser: any = createAsyncThunk(
  "timereport/fetch",
  async (user: any, thunkAPI) => {
    const state: any = thunkAPI.getState();

    return await getTimeReportsByUser(
      state.authentication.jwtIdToken,
      user.email,
      state.timeReport.filter.year,
      state.timeReport.filter.month
    )
  }

);

export const fetchTimeReportsMeta: any = createAsyncThunk(
  "timereportmeta/fetch",
  async (user: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getTimeReportsMeta(
      state.authentication.jwtIdToken,
      user.email
    );
  }
);

export const saveNewTimeReport: any = createAsyncThunk<any, TimeReport>(
  "timereport/create",
  async ({ user, timeReport }: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const response = await postTimeReport(
      state.authentication.jwtIdToken,
      { ...timeReport, email: user.email, time: timeReport.time.toDateString() }
    );

    return response;
  }
);
export const saveUpdatedTimeReport: any = createAsyncThunk<any, TimeReport>(
  "timereport/update",
  async (timeReport: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const response = await updateTimeReport(state.authentication.jwtIdToken, {...timeReport, time: timeReport.time.toDateString()}
    );
    console.log("Vi har hamnat i slicen ", timeReport);
    return response;
  }
);

export const removeTimeReport: any = createAsyncThunk<any, TimeReport>(
  "timereport/remove",
  async ({ user, timeReport }: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const response = await deleteTimeReport(
      state.authentication.jwtIdToken,
      timeReport
    );
    //thunkAPI.dispatch(fetchTimeReports({ email: user.email }));
    return response;
  }
);

type TimeReportState = {
  entities: TimeReport[],
  loading: string,
  filter: DateFilter,
  sort: 'desc' | 'asc',
  meta: any;
}

const newDate = new Date()
const currentMonth = newDate.getMonth() + 1;
const currentYear = newDate.getFullYear();

// Then, handle actions in your reducers:
const timeReportSlice = createSlice({
  name: "timereports",
  initialState: {
    entities: [],
    loading: "idle",
    filter: { year: currentYear, month: currentMonth },
    sort: 'desc',
    meta: { 2021: [1] },
  } as TimeReportState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setFilter(state, action: PayloadAction<DateFilter>) {

      const year: number = action.payload.year;
      //If you change to year where previous month is not available, set max possible month that year
      const month = action.payload.month === 0 ? 0 : state.meta[year].indexOf(action.payload.month) > -1 ? action.payload.month : Math.max(...state.meta[year]);
      state.filter = { year, month };
    },

    toggleSort(state) {
      state.sort = state.sort === 'desc' ? 'asc' : 'desc';
    },

    addNew(state, action: PayloadAction<Date>) {

      const newTimeReport = {
        time: action.payload,
        description: '',
        hours: 0,
        id: -1,
        email: '',
        project_id: 0,
        editMode: true
      }
      state.entities.push(newTimeReport);
    },

    cancelNew(state, action: PayloadAction<TimeReport>) {

      state.entities = [...state.entities].filter(timereport => timereport.id != -1);
      state.entities.forEach((timereport) => delete timereport.editMode);

    },

    // TODO Byt namn till editTimeReport? 
    updateTimeReport(state, action: PayloadAction<TimeReport>) {

      state.entities = state.entities.map(timereport => timereport.id === action.payload.id ? action.payload : { ...timereport });

    },
    editMode(state, action: PayloadAction<number>) {
      state.entities = state.entities.map(timereport => timereport.id === action.payload ? { ...timereport, editMode: true } : { ...timereport });
    },
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchTimeReportsByUser.fulfilled]: (state, action) => {
      
      state.entities = action.payload.map((timeReport: any) => ({ ...timeReport, time: new Date(timeReport.time) }));
      state.loading = "complete";
      
    },
    [fetchTimeReportsByUser.pending]: (state, action) => {
      state.loading = "loading";
    },
    //TODO: uppdaterar statet med aktuell data för att få in alla timrapporter från ett valt projekt.
    //måste stå något här för annars hämtas inte datan med timereports!
    [fetchTimeReportsByProject.fulfilled]: (state, action) => {
      state.entities = action.payload.map((timeReport: any) => ({ ...timeReport, time: new Date(timeReport.time) }));
      state.loading = "complete";
    },
    [fetchTimeReportsMeta.fulfilled]: (state, action) => {
      state.meta = action.payload.reduce((pV: any, cV: any) => !pV[cV.year] ? { ...pV, [cV.year]: [cV.month] } : { ...pV, [cV.year]: [...pV[cV.year], cV.month] }, {});
      // const year = Math.max(...action.payload.map((yearMonth: any) => yearMonth.year));
      // const month = Math.max(...action.payload.filter((yearMonth: any) => yearMonth.year === year).map((yearMonth: any) => yearMonth.month));

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      state.filter = { year, month };

    },
    [fetchTimeReportsMeta.pending]: (state, action) => {
      //state.loading = "loading";
    },
    [saveNewTimeReport.fulfilled]: (state, action) => {

      //state.entities = [...state.entities].filter(timereport => !timereport.editMode);
      // delete state.newTimeReport;
      state.entities = [...state.entities, action.payload].filter(timereport => !timereport.editMode);

    },

    [saveNewTimeReport.pending]: (state, action) => {
      //state.loading = "loading";
    },

    [saveUpdatedTimeReport.fulfilled]: (state, action) => {

      // state.entities = state.entities.map(item => item.id === timeReport.id ? {...timeReport, time: new Date(timeReport.time)} : { ...item });
      // TODO - fullösning här, men förslag är att mappa om i serverdel så rätt format av data skickas till client.
      delete action.payload[0].created_at;
      state.entities = [...state.entities, action.payload[0]].filter(timereport => !timereport.editMode);

    },

    [removeTimeReport.fulfilled]: (state, action) => {
      state.entities = [...state.entities].filter(timereport => timereport.id != action.payload.id);
    }
  },
});

export default timeReportSlice;