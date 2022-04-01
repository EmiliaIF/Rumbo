import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { moveSyntheticComments } from "typescript";
import { getTransactions, getTransactionsMeta, postTransaction, deleteTransaction } from "../../api/crudTransactions"
import getDescriptionsByEmail from "../../api/getDescriptionsByEmail";
import { getVismaImport } from '../../api/getVismaImport';


import { Transaction, DateFilter, TransactionFilter, TransactionStatus } from "../../types";

// First, create the thunk
export const fetchTransactions: any = createAsyncThunk(
  "transactions/fetch",
  async (user: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getTransactions(
      state.authentication.jwtIdToken,
      user.email,
      state.transaction.filter.year,
      state.transaction.filter.month,
      state.transaction.filter.description
    );
  }
);
export const fetchDescriptionSuggestions: any = createAsyncThunk(
  "descriptions/fetch",
  async (user: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getDescriptionsByEmail(
      state.authentication.jwtIdToken,
      user.email
    );
  }
);

// First, create the thunk
export const fetchTransactionsMeta: any = createAsyncThunk(
  "transactionsmeta/fetch",
  async (user: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getTransactionsMeta(
      state.authentication.jwtIdToken,
      user.email
    );
  }
);

// First, create the thunk
export const importFromVisma: any = createAsyncThunk(
  "importfromvisma/fetch",
  async ({ user, filter }: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    return await getVismaImport(
      state.authentication.jwtIdToken,
      user.email
    );
  }
);

export const saveNewTransaction: any = createAsyncThunk<any, Transaction>(
  "transactions/create",
  async ({ user, transaction }: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const response = await postTransaction(
      state.authentication.jwtIdToken,
      { ...transaction, email: user.email, time: transaction.time.toDateString() }
    );
    thunkAPI.dispatch(fetchTransactions({ email: user.email }));
    return response;
  }
);

export const removeTransaction: any = createAsyncThunk<any, Transaction>(
  "transaction/remove",
  async ({ user, transaction }: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const response = await deleteTransaction(
      state.authentication.jwtIdToken,
      transaction
    );
    thunkAPI.dispatch(fetchTransactions({ email: user.email }));
    return response;
  }
);

//TODO: searchTransactionDescription

type TransactionState = {
  entities: any[];
  loading: string;
  filter: TransactionFilter;
  sort: "desc" | "asc";
  meta: any;
  descriptionSuggestions: string[];
};

// Then, handle actions in your reducers:
const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    entities: [],
    loading: "idle",
    filter: { year: 2021, month: 0 },
    sort: "desc",
    meta: { 2021: [1] },
    descriptionSuggestions: []
  } as TransactionState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setFilter(state, action: PayloadAction<DateFilter>) {
      const year: number = action.payload.year;
      //If you change to year where previous month is not available, set max possible month that year
      const month = action.payload.month === 0 ? 0 : state.meta[year].indexOf(action.payload.month) > -1 ? action.payload.month : Math.max(...state.meta[year]);
      state.filter = { year, month, description: state.filter.description };
      state.entities = state.entities.filter((transaction: Transaction) => transaction.status != TransactionStatus.New);
    },
    setDescriptionFilter(state, action: PayloadAction<string>) {
      state.filter = { ...state.filter, description: action.payload }
    },
    toggleSort(state) {
      state.sort = state.sort === "desc" ? "asc" : "desc";
    },
    addNew(state, action: PayloadAction<Date>) {
      state.entities.push(
        {
          time: action.payload,
          description: '',
          email: '',
          status: TransactionStatus.New
        }
      )
    },
    cancelNew(state) {
      state.entities = state.entities.filter((transaction: Transaction) => transaction.status != TransactionStatus.New);
      state.descriptionSuggestions = [];
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      state.entities = state.entities.map((transaction: Transaction) => transaction.status === TransactionStatus.New ? action.payload : transaction);
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchTransactions.fulfilled]: (state, action) => {
      state.entities = action.payload.map((transaction: any) => ({ ...transaction, time: new Date(transaction.time) }));
      state.loading = "complete";
    },
    [fetchTransactions.pending]: (state, action) => {
      state.loading = "loading";
    },
    [fetchTransactionsMeta.fulfilled]: (state, action) => {
      state.meta = action.payload.reduce((pV: any, cV: any) => !pV[cV.year] ? { ...pV, [cV.year]: [cV.month] } : { ...pV, [cV.year]: [...pV[cV.year], cV.month] }, {});
      const year = Math.max(...action.payload.map((yearMonth: any) => yearMonth.year));
      const month = 1; // Math.max(...action.payload.filter((yearMonth: any) => yearMonth.year === year).map((yearMonth: any) => yearMonth.month));
      state.filter = { year, month };
      //state.loading = "complete";
    },
    [fetchTransactionsMeta.pending]: (state, action) => {
      //state.loading = "loading";
    },
    [saveNewTransaction.fulfilled]: (state, action) => {
      const transactionTime = new Date(action.payload.time);
      const year = transactionTime.getFullYear();
      const month = transactionTime.getMonth() + 1;

      //Add year and month to filter if not exists
      if (!state.meta[year]) {
        state.meta[year] = [month];
      } else {
        if (!state.meta[year].some((m: number) => m === month)) {
          state.meta[year].push(month);
        }
      }

      //Set filter to newly added transaction
      state.filter.year = year;

      if (state.filter.month != 0) {
        //not if all is selected
        state.filter.month = month;
      }

      //Hide add transaction form
      state.entities = state.entities.filter((transaction: Transaction) => transaction.status != TransactionStatus.New);
    },
    [saveNewTransaction.pending]: (state, action) => {
      //state.loading = "loading";
    },
    [fetchDescriptionSuggestions.fulfilled]: (state, action) => {
      state.descriptionSuggestions = action.payload;

    }, [fetchDescriptionSuggestions.pending]: (state, action) => {
      console.log("PENDING");
    },
    [fetchDescriptionSuggestions.rejected]: (state, action) => {
      console.log("REJECTED");
    },
    [removeTransaction.fulfilled]: (state, action) => {
      console.log("Transaction removed");
    },
    [importFromVisma.fulfilled]: (state, action) => {
      console.log(action);
      state.entities = state.entities.concat(action.payload);
    },
    [importFromVisma.pending]: (state, action) => {
      console.log('import from visma pending');
    },
    [importFromVisma.rejected]: (state, action) => {
      console.log('import from visma rejected');
    }
  },
});

export default transactionsSlice;