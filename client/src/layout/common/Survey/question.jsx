import React from "react";

const Question = ({
  name,
  questionText,
  options,
  value,
  onChange,
  inputType,
  pattern,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div>
      <label>{questionText}</label>
      {options ? (
        options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name={name}
              value={option}
              checked={value === option}
              onChange={handleChange}
              required
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))
      ) : (
        <input
          type={inputType || "text"}
          name={name}
          value={value}
          onChange={handleChange}
          pattern={pattern}
          required
        />
      )}
    </div>
  );
};

export default Question;
