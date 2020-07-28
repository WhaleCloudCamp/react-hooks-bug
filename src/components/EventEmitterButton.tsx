// import React, { useState, useEffect } from 'react';
import React, { useState } from "react";
import { layoutEmitter } from "@/utils/EventEmitter";

interface IState {
  initNumber: number;
}

export default ({ initNumber }: IState) => {
  const [state, setstate] = useState(initNumber);

  // useEffect(() => {  // unfixed: 可以在这里解决，但第一次 this._subscription 未初始化，不是个对象，会报错。
  //   layoutEmitter.emit({ state });
  //   return () => {}
  // }, [state])

  return (
    <button
      //   style={{ fontSize: '30px' }}
      style={{ fontSize: ".6rem" }} // fixed: 适配一下
      onClick={() => {
        setstate(state + 1);
        layoutEmitter.emit({ state }); // unfixed: 父组件订阅不到初次的状态。 可以 emit({state + 1})，但不想被骂。
      }}
    >
      EventEmitter {state}{" "}
    </button>
  );
};
