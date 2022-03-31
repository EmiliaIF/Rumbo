import { useState, } from "react";
import { Table, Button, IconButton, TrashIcon, CrossIcon, majorScale, MoreIcon } from "evergreen-ui";
import { Transaction } from "../types";
import styled from "styled-components";
import dateformat from "dateformat";
import { isMobile } from "react-device-detect";

import "react-datepicker/dist/react-datepicker.css";

type PreliminaryTransactionRowType = {
  transaction: Transaction;
  onRemove: (transaction: Transaction) => any;
  isAdmin: boolean;
};

const StyledIconButton = styled(IconButton)`
  box-shadow: none;
  background-image: none;
  background-color: inherit;
  width: 24px;
  height: 24px;
  &:hover {
    background-image: none !important;
    background-color: #ddd;
  }
`;

const StyledTableRow = styled(Table.Row)`
  background-color: #FFFAD0;
  &:hover > div {
    background-color: #efefef;
  }
`;

const PreliminaryTransactionRow = ({
  transaction,
  onRemove,
  isAdmin
}: PreliminaryTransactionRowType) => {

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const renderMoreMenu = () => (
    <>
      <IconButton icon={TrashIcon} intent="danger" marginLeft={majorScale(1)} onClick={() => { setShowConfirmDelete(true); setShowMoreMenu(false); }} />
      <IconButton icon={CrossIcon} intent="none" marginLeft={majorScale(1)} onClick={() => { setShowMoreMenu(false); }} />
    </>
  )

  const renderConfirmDelete = () => (
    <>
      <Button intent="danger" onClick={() => onRemove(transaction)}>Ta bort</Button>
      <Button marginLeft={majorScale(1)} intent="none" onClick={() => setShowConfirmDelete(false)}>Ångra</Button>
    </>
  )

  return (
    <StyledTableRow
      key={transaction.id}
    >
      { !isMobile && (
        <>
          <Table.TextCell maxWidth="125px">
            {dateformat(transaction.time, "yyyy-mm-dd")}
          </Table.TextCell>
          <Table.TextCell>{transaction.description}</Table.TextCell>
        </>
      )}
      { isMobile && (
        <>
          <Table.TextCell>
            <p>
              {dateformat(transaction.time, "yyyy-mm-dd")}
              <br />
              {transaction.description}
            </p>
          </Table.TextCell>
        </>
      )}
      { <><Table.TextCell isNumber>
        {new Intl.NumberFormat("sv-SE").format(Math.round(transaction.amount))}
      </Table.TextCell>
        <Table.TextCell isNumber>
          
        </Table.TextCell>
        <Table.Cell justifyContent="right" width="10px">
          {
            renderMoreMenu()
          }
        </Table.Cell></>}

    </StyledTableRow>
  )
};

export default PreliminaryTransactionRow;
