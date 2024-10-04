// src/components/common/Input.jsx
import React from "react";

const Input = ({
  label,
  name, // Added name prop
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name} // Associating label with input
        name={name} // Passing name prop to input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
