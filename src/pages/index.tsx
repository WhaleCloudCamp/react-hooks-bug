import React, { useEffect, useState } from "react";
import { layoutEmitter } from "@/utils/EventEmitter";
import EventEmitterButton from "@/components/EventEmitterButton";

export interface IStateData {
  state: number;
}

export default () => {
  const [list, setList] = useState<Array<IStateData>>([]);

  useEffect(() => {
    layoutEmitter.useSubscription((data) => {
      // list.push(data);

      // fixed: 不能在 setState 外直接操作 state，react 数据的不可变性。
      // 直接操作 state 会导致之前的变更无效（应该是这个原因），所以 DOM 不会重新渲染。

      console.log(data);
      console.log(list);
      // setList(list);

      if (data as IStateData) {
        // fixed: unkonwn 类型只能分配给 unkonwn 或者 any，所以做个类型断言。
        setList([...list, data as IStateData]);
      } else {
        return;
      }
    });
  }, [list.length]);

  return (
    <div>
      <EventEmitterButton initNumber={11} />
      <p>list length:{list.length}</p>
      {
        list.map(({ state }) => (
          <p key={`_${state}`}>{state}</p>
        )) // fixed: 少了 key，顺便把 state 解构出来，写 item.state 多麻烦。
      }
    </div>
  );
};
