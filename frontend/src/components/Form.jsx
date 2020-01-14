import React from "react";

const Form = props => (
      <form onSubmit={props.getOrder} style={{ marginBottom: "2rem"}}>
        <input
          className="form__input"
          type="text"
          name="workerName"
          id="name-input"
        />
        <button className="form__button">Search</button>
      </form>
);

export default Form;
