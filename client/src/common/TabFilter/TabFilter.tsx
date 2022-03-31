import React, { FunctionComponent } from "react";
import { TabNavigation, Tab } from "evergreen-ui";
import styled , { css } from "styled-components";

type TabFilterProps = {
  items: string[];
  selectedIndex: number;
  onSelect: (selectedIndex: number, value?: any) => void;
  inverted?: boolean;
  selectAllOption?: boolean;
};

const TabPadding = css`
  padding-left: 10px;
  padding-right: 10px;
`;

export const DefaultTab = styled(Tab)` 
  ${TabPadding}
  ${(props) =>
    props.$inverted &&
    `
  &[aria-selected="true"], &[aria-selected="true"]:hover {
    background-color: white;
  }
  & {
    background-color: #444;
    color: #ccc;
  }
  &:hover {
    background-color: #555;
  }`}
`;

export const SelectAllTab = styled(Tab)`
  ${TabPadding}
  &[aria-selected="true"],
  &[aria-selected="true"]:hover {
    background-color: white;
    background-color: #444;
    color: white;
  }
  & {
    background-color: #888;
    color: white;
  }
  &:hover {
    background-color: #555;
  }
`;

export const TabFilter: FunctionComponent<TabFilterProps> = ({
  items,
  selectedIndex,
  onSelect,
  inverted,
  selectAllOption,
  children,
}) => {
  return (
    <TabNavigation>
      {!!selectAllOption && (
        <SelectAllTab
          key={-1}
          is="span"
          onSelect={() => onSelect(-1)}
          id={-1}
          isSelected={selectedIndex === -1}
        >
          Alla
        </SelectAllTab>
      )}
      {items.map((tab, index) => {
        const isSelected = index === selectedIndex;
        return (
          <DefaultTab
            $inverted={inverted}
            key={tab}
            is="span"
            onSelect={() => onSelect(index, tab)}
            id={tab}
            isSelected={isSelected}
          >
            {tab}
          </DefaultTab>
        );
      })}
      {children}
    </TabNavigation>
  );
};
