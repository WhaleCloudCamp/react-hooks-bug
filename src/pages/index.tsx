import React, { useEffect, useState } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';
import EventEmitterButton from '@/components/EventEmitterButton';

interface ItemProps {
    state: number;
}

interface State {
    state: number
}
export default () => {
    const [list, setList] = useState([] as Array<State>);

    useEffect(() => {
        layoutEmitter.useSubscription((data) => {
            list.push(data);
            console.log(data);
            console.log(list);
            // 4. list 为数组，引用数据类型，我们不能直接操作state要结构出来
            const listData = [...list]
            setList(listData);
        });
    }, [])

    return (
        <div>
            <EventEmitterButton initNumber={11} />
            <p>list length:{list.length}</p>
            {
                // 5. item中state的参数类型
                // 6. 通过map循环需要给标签加唯一的key
                list.map((item: ItemProps) => <p key={item.state}>{item.state}</p>)
            }
        </div>
    )
};
