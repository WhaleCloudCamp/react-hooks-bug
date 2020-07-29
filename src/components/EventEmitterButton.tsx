import React, { useState } from "react";
import { layoutEmitter } from "@/utils/EventEmitter";

export default ({ initNumber }: { initNumber: number }) => {
  const [state, setstate] = useState<number>(initNumber);

  return (
    <button
      style={{ fontSize: "0.3rem" }}
      onClick={() => {
        setstate(state + 1);
        layoutEmitter.emit({ state });
      }}
    >
      EventEmitter {state}{" "}
    </button>
  );
};
