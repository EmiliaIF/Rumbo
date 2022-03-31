import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  Menu as EvergreenMenu,
  Tab,
  TabNavigation,
  Popover,
  Position,
} from "evergreen-ui";

export const MenuTab = styled(Tab)`
  &[aria-selected="true"],
  &[aria-selected="true"]:hover {
    background-color: white;
  }
  & {
    background-color: #444;
    color: #ccc;
  }
  &:hover {
    background-color: #555;
  }
`;

type MenuItemProps = {
  title: string;
  relativeUri?: string;
  isSelected?: boolean;
  onSelect?: () => any;
};

const Item: FunctionComponent<MenuItemProps> = ({
  title,
  isSelected,
  onSelect,
}) => (
  <MenuTab
    key={title}
    is="span"
    onSelect={() => onSelect && onSelect()}
    isSelected={isSelected}
  >
    {title}
  </MenuTab>
);

const DropdownMenu = ({ children }: any) => {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={({ close }) => (
        <EvergreenMenu>
          <EvergreenMenu.Group>
            {children.map((child: any) => {
              return (
                <EvergreenMenu.Item
                  key={child.props.title}
                  onSelect={() => {
                    child.props.onSelect();
                    close();
                  }}
                >
                  {child.props.title}
                </EvergreenMenu.Item>
              );
            })}
          </EvergreenMenu.Group>
        </EvergreenMenu>
      )}
    >
      <MenuTab is="span" marginRight={16}>
        Admin
      </MenuTab>
    </Popover>
  );
};

const SubItem: FunctionComponent<MenuItemProps> = ({
  title,
  relativeUri,
  isSelected,
  children,
}) => (
  <EvergreenMenu.Item onSelect={() => console.log("project")}>
    Project
  </EvergreenMenu.Item>
);

interface MenuSubComponents {
  Item: typeof Item;
  SubItem: typeof SubItem;
}

type MenuProps = {
  children: any;
};

const Menu: FunctionComponent<MenuProps> & MenuSubComponents = ({
  children,
}) => {
  return (
    <TabNavigation>
      {children &&
        children.map((child: any, index: number) => {
          if (child && child.props.children) {
            const subItems = Array.isArray(child.props.children)
              ? child.props.children
              : [child.props.children];
            return <DropdownMenu key={index} title="hej">{subItems}</DropdownMenu>;
          } else {
            return child;
          }
        })}
    </TabNavigation>
  );
};

Menu.Item = Item;
Menu.SubItem = SubItem;

export { Menu };
