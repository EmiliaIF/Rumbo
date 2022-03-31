import React, { FunctionComponent } from "react";
import { isMobile } from "react-device-detect";
import { Pane, Heading, Button } from "evergreen-ui";
import styled from 'styled-components';


type ViewWrapperProps = {
  title: string;
  renderButtons?: () => any;
};

const HeadingButtons = styled.div`
  float: right;
`;

export const ViewWrapper: FunctionComponent<ViewWrapperProps> = ({
  title,
  renderButtons,
  children,
}) => (
  <Pane background="tint2" padding={isMobile ? "20px" : "40px"}>
    <Heading size={700}>{title}<HeadingButtons>{renderButtons && renderButtons()}</HeadingButtons></Heading>
    {children}
  </Pane>
);
