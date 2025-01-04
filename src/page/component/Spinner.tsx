import React from "react";
import loading from "../../assets/loading.png";

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <img src={loading} className="animate-spin w-[50px]" />
    </div>
  );
}

export default Spinner;
