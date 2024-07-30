import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidField,
  setInvalidField,
}) => {
  return (
    <div className="w-full relative">
      {value.trim() && (
        <label
          htmlFor={nameKey}
          className="text-[12px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm"
        >
          {nameKey ? nameKey.charAt(0).toUpperCase() + nameKey.slice(1) : ""}
        </label>
      )}
      <input
        type={type || "text"}
        placeholder={
          nameKey ? nameKey.charAt(0).toUpperCase() + nameKey.slice(1) : ""
        }
        className="rounded-sm py-2 px-4 border w-full my-2 placeholder:text-sm placeholder:italic outline-none"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
};

export default InputField;
