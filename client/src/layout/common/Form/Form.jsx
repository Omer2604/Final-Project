import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Textarea from "./Textarea";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      errors: {},
    };
    this.schema = {};
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoComplete="off"
        id={name}
      />
    );
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };

  renderTextarea(name, label) {
    const { data, errors } = this.state;
    return (
      <Textarea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        className="form-control"
        autoComplete="off"
        cols="30"
        rows="5"
      />
    );
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  renderButton(btnText, className = "btn btn-primary mt-2 col-12") {
    return (
      <button
        disabled={this.validate()}
        className={className}
        style={{ height: "40px", padding: "5px 10px" }}
      >
        {btnText}
      </button>
    );
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  doSubmit() {
    throw new Error("doSubmit function not implemented");
  }
}

export default Form;
