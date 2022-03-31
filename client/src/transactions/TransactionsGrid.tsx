
import { Table, CaretUpIcon, CaretDownIcon, Pane, Spinner } from "evergreen-ui";
import { Transaction, TransactionStatus } from "../types";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import EditTransactionRow from './EditTransactionRow';
import TransactionRow from "./TransactionRow";
import PreliminaryTransactionRow from "./PreliminaryTransactionRow";

import TransactionsHeader from "./TransactionsHeader";

type TransactionsGridType = {
  transactions: Transaction[];
  sort?: "asc" | "desc";
  toggleSort: any;
  updateTransaction: (transaction: Transaction) => any;
  cancelTransaction: () => any;
  saveTransaction: (transaction: Transaction) => any;
  removeTransaction: (transaction: Transaction) => any;
  setDescriptionFilter: (description: string) => any;
  descriptionFilter?: string;
  isAdmin: boolean;
  isLoading: boolean;
};

const Wrapper = styled.div`
background-color: white;
`;

const TransactionsGrid = ({
  transactions,
  sort,
  toggleSort,
  updateTransaction,
  cancelTransaction,
  saveTransaction,
  removeTransaction,
  setDescriptionFilter,
  descriptionFilter,
  isAdmin,
  isLoading
}: TransactionsGridType) => {
  return (
    <Wrapper>
      <Table>
        <TransactionsHeader sort={sort} toggleSort={toggleSort} setDescriptionFilter={setDescriptionFilter} descriptionFilter={descriptionFilter} />
        {isLoading ? (
          <Pane height="250px" display="flex" textAlign="center">
            <Spinner margin="auto" />
          </Pane>
        ) : !transactions.length ? (
          <>Inga transaktioner</>
        ) : (
          <Table.Body>
            {transactions.map((transaction: Transaction) =>
              transaction.status === TransactionStatus.Preliminary ?
                <PreliminaryTransactionRow key={transaction.id} transaction={transaction} onRemove={removeTransaction} isAdmin={isAdmin} />
                : transaction.status === TransactionStatus.New ?
                  <EditTransactionRow key={transaction.id} updateTransaction={updateTransaction} transaction={transaction} saveTransaction={saveTransaction} cancelTransaction={cancelTransaction} /> :
                  <TransactionRow key={transaction.id} transaction={transaction} onRemove={removeTransaction} isAdmin={isAdmin} />
            )}
          </Table.Body>
        )}
      </Table>
    </Wrapper>
  );
};

export default TransactionsGrid;
