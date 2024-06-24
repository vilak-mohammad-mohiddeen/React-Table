import React from "react";

export function GlobalFilterComponent({ filter, setFilter }) {
  const handleOnChange = (e) => {
    const value = e.target.value || '';
    setFilter(value);
    console.log(value);
  };

  return (
    <>
      <span>
        Search{" "}
        <input
          name="search"
          type="text"
          value={filter}
          onChange={handleOnChange}
        />
      </span>
    </>
  );
}
