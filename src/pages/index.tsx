import React, { useEffect, useState } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';
import EventEmitterButton from '@/components/EventEmitterButton';

export default () => {
    const [list, setList] = useState([
        {
            num:11,
        }
    ]);

    useEffect(() => {
        layoutEmitter.useSubscription((data) => {
            list.push(data);
            console.log(data);
            console.log(list);
            setList([...list]);
        });
    }, [])
    return (
        <div>
            <EventEmitterButton initNumber={list[0].num} />
            <p>list length:{list.length}</p>
            {
                list.map(item => <p key={item.num}>{item.num}</p>)
            }
        </div>
    )
};
