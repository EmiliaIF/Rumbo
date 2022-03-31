import React, { useState, forwardRef, useRef } from "react";
import { Table, CaretUpIcon, CaretDownIcon } from "evergreen-ui";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

const SortingHeaderCell = styled(Table.TextHeaderCell)`
user-select: none;
&:hover {
cursor: pointer;
}
& svg {
vertical-align: middle;
}
`;

type TransactionsHeaderType = {
  setDescriptionFilter: (description: string) => any;
  descriptionFilter?: string;
  sort?: "asc" | "desc";
  toggleSort: any;
};

const TransactionsHeader = ({ setDescriptionFilter, descriptionFilter, sort, toggleSort }: TransactionsHeaderType) => (
  <Table.Head padding="0px">
    {!isMobile && (
    <>
      <SortingHeaderCell maxWidth="125px" onClick={() => toggleSort()}>
        Datum
          {sort === "desc" ? (
          <CaretUpIcon size={14} />
        ) : (
          <CaretDownIcon size={14} />
        )}
      </SortingHeaderCell>
    </>
    )}
    <Table.SearchHeaderCell placeholder="BESKRIVNING" value={descriptionFilter} onChange={(descriptionFilter) => setDescriptionFilter(descriptionFilter)} />
    <Table.TextHeaderCell>Belopp (kr)</Table.TextHeaderCell>
    <Table.TextHeaderCell>Saldo (kr)</Table.TextHeaderCell>
    <Table.TextHeaderCell></Table.TextHeaderCell>

  </Table.Head>
)

export default TransactionsHeader;