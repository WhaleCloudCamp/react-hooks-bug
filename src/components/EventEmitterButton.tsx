import React, { useState } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';
// 定义样式文件
import styles from './EventEmitterButton.less';

// 自定义类型值，表示可允许的值，可多个
interface MyType {
    initNumber: number;
}

// 和上面interface对应，表示有一个对象，其中有一个值为initNumber且它的类型为number
export default ({ initNumber }: MyType) => {

    const [state, setstate] = useState(initNumber);

    // 去掉内联样式，写到less中
    return <button
        className={styles.myBtnFontStyle}
        onClick={() => {
            setstate(state + 1);
            layoutEmitter.emit({ state });  // 执行layoutEmitter所绑定的所有事件。
        }}
    >EventEmitter {state} </button>
};
