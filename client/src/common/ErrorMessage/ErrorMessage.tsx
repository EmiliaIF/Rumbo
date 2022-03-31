import { FunctionComponent } from "react";
import { isMobile } from "react-device-detect";
import { Pane, Heading } from "evergreen-ui";
import styled from 'styled-components';


type ErrorMessageProps = {
  title: string;

};

const HeadingButtons = styled.div`
  float: right;
`;

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  title
}) => (
  <Pane background="tint2" padding={isMobile ? "20px" : "40px"}>
    <Heading size={700} >{title}<HeadingButtons></HeadingButtons></Heading>

  </Pane>
);