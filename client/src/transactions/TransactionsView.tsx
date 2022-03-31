import React, { useEffect } from "react";
import { Transaction, TransactionStatus } from "../types";
import { Pane, Spinner, Button } from "evergreen-ui";
import { TimespanSelector } from "../common/TimespanSelector";
import TransactionsGrid from "./TransactionsGrid";
import transactionsSlice, {
  fetchTransactions,
  fetchTransactionsMeta,
  saveNewTransaction,
  removeTransaction,
  fetchDescriptionSuggestions,
  importFromVisma
} from "./slices/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ViewWrapper } from "../common/ViewWrapper";
import { Employee } from "../app/slices/appSlice";
import isAdminSelector from "../utils/isAdminSelector";
import { TransactionFilter, DateFilter } from "../types/index";
import { defaultDate } from "../utils/defaultDate";

type TransactionsViewType = {
  jwtToken: string;
  user: Employee;
  isAdmin: boolean;
};

const TransactionsView = ({ jwtToken, user, isAdmin }: TransactionsViewType) => {
  const dispatch = useDispatch();

  const filter: TransactionFilter = useSelector(
    (state: any) => state.transaction.filter
  );

  const transactions: Transaction[] = useSelector(
    (state: any) => state.transaction.entities
  );

  const showAddNew = () => {

    const date = defaultDate(filter.year, filter.month);
    dispatch(transactionsSlice.actions.addNew(date));
  }

  const isLoading: boolean =
    useSelector((state: any) => state.transaction.loading) === "loading";

  const sort = useSelector((state: any) => state.transaction.sort);
  const transactionMeta = useSelector((state: any) => state.transaction.meta);

  useEffect(() => {
    dispatch(fetchTransactions(user));
  }, [dispatch, filter, user]);

  useEffect(() => {
    dispatch(fetchTransactionsMeta(user));
    dispatch(fetchDescriptionSuggestions(user));
  }, [dispatch, user]);

  const renderButtons = () => isAdmin && <>
    { process.env.REACT_APP_VISMA_IMPORT_FEATURE === 'true' && <Button height={32} appearance="primary" intent="none" onClick={() => dispatch(importFromVisma({ user, filter }))} marginRight={10}>Importera från Visma</Button>}
    <Button height={32} appearance="primary" intent="success" onClick={() => showAddNew()}>Lägg till</Button>
  </>;

  const desc = sort === "desc" ? -1 : 1;
  const sortedTransactions = [...transactions]
    .sort((a, b) =>
      a.time < b.time ? -desc : desc
    )
    .filter((transaction: Transaction) => transaction.status !== TransactionStatus.New);

  const newTransaction = transactions.find((transaction: Transaction) => transaction.status === TransactionStatus.New);

  if (newTransaction) {
    sortedTransactions.unshift(newTransaction)
  }

  return (
    <ViewWrapper title="Personlig balansräkning" renderButtons={renderButtons}>
      <TimespanSelector
        onChange={(newFilter: DateFilter) =>
          dispatch(transactionsSlice.actions.setFilter(newFilter))
        }
        yearMonths={transactionMeta}
        filter={filter}
      />
      <Pane marginTop="20px" display="block">
        <TransactionsGrid
          transactions={sortedTransactions}
          updateTransaction={(transaction: Transaction) => dispatch(transactionsSlice.actions.updateTransaction(transaction))}
          cancelTransaction={() => dispatch(transactionsSlice.actions.cancelNew())}
          saveTransaction={(transaction: Transaction) => dispatch(saveNewTransaction({ user, transaction }))}
          removeTransaction={(transaction: Transaction) => dispatch(removeTransaction({ user, transaction }))}
          sort={sort}
          toggleSort={() => dispatch(transactionsSlice.actions.toggleSort())}
          setDescriptionFilter={(description: string) => dispatch(transactionsSlice.actions.setDescriptionFilter(description))}
          descriptionFilter={filter.description}
          isAdmin={isAdmin}
          isLoading={isLoading}
        />
      </Pane>
    </ViewWrapper>
  );
};

export default TransactionsView;
