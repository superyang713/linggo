import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";

const Toggle = props => (
      <ToggleButton
        style={{ marginBottom: "2rem" }}
        type="radio"
        onClick={props.toggleSort}
        id="deadline-input"
      >
        Sort By Date
      </ToggleButton>
);

export default Toggle;
