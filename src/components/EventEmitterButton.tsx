import React, { useState } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';

export default ({ initNumber }) => {

    const [state, setstate] = useState(initNumber);

    return <button
        style={{ fontSize: '30px' }}
        onClick={() => {
            setstate(state + 1)
            layoutEmitter.emit({ state });
        }}
    >EventEmitter {state} </button>
};
