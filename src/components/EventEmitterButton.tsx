import React, { useState,useEffect } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';

export default (props:any) => {

    const [num, setNum] = useState(props.initNumber);

    // useEffect(() => {
    //     layoutEmitter.emit({num:a});  
    //     return ()=>{}
    // }, [num])
    console.log(num);
    return <button
        style={{ fontSize: '30px' }}
        onClick={() => {
            const a =num+1;
            setNum(a)
            layoutEmitter.emit({num:a});  
        }}
    >EventEmitter {num} </button>
};
