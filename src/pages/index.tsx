import React, { useEffect, useState } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';
import EventEmitterButton from '@/components/EventEmitterButton';
interface ListItemProps {
    state?: number;
}
export default () => {
    const [list, setList] = useState<ListItemProps[]>([]);

    useEffect(() => {
        layoutEmitter.useSubscription((data) => {
            // 按你们的写法实现的
            // bug 重现步骤
            // 点击 EventEmitterButton 两次
            // 点击 Add List 一次
            // 点击 EventEmitterButton 一次
            // 期望结果
            // 11
            // 12
            // 时间戳
            // 13
            list.push(data as ListItemProps);
            // setList([...list]);

            // 通过传入函数来修改state。
            // 参数是一个函数时，参数具体的值只有在对应的 setState 调用的时候才会确定，进而解决闭包问题。
            setList((l) => [...l]); // 接收先前的 state ，并返回一个更新后的值。
          });
        }, [list]); // 监听 state 的变化。

    return (
        <div>
            <EventEmitterButton initNumber={11} />
            <button style={{ fontSize: '0.6rem' }} onClick={() => {
                setList([...list, { state: new Date().getTime() }]) // 这里 list 变化触发了 useEffect 执行。
            }}>Add List</button>
            <p>list length:{list.length}</p>
            {
                list.map(item => <p key={item.state}>{item.state}</p>)
            }
        </div>
    )
};
