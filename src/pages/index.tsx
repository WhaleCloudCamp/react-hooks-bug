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
            setList([...list]);
        });
    }, [])

    return (
        <div>
            <EventEmitterButton initNumber={11} />
            <button style={{ fontSize: '0.6rem' }} onClick={() => {
                // 每次改变list值的时候都使用emit去提交，不然两边的数据不同步
                layoutEmitter.emit({ state: new Date().getTime() });

                // 这里直接使用setList只是将本页面中的list改变，并没有改变layoutEmitter所绑定的list值
                // setList([...list, { state: new Date().getTime() }])
            }}>Add List</button>
            <p>list length:{list.length}</p>
            {
                list.map(item => <p key={item.state}>{item.state}</p>)
            }
        </div>
    )
};
