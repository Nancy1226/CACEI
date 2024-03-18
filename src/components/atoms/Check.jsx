import React from "react";

function Check({ onChange, checked, type,value }) {
  return (
    <>
      <input
      className="h-5 w-5 flex items-cente"
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
}

export default Check;
