import React from "react";
import { Pane, Spinner } from "evergreen-ui";

const SpinnerBox = () => (
  <Pane display="flex" alignItems="center" justifyContent="center" height={200}>
    <Spinner />
  </Pane>
);

export default SpinnerBox;
