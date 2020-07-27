import React, { useEffect, useState } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';
import EventEmitterButton from '@/components/EventEmitterButton';

export default () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        layoutEmitter.useSubscription((data) => {
            list.push(data);
            console.log(data);
            console.log(list);
            setList(list);
        });
    }, [])
    return (
        <div>
            <EventEmitterButton initNumber={11} />
            <p>list length:{list.length}</p>
            {
                list.map(item => <p>{item.state}</p>)
            }
        </div>
    )
};
