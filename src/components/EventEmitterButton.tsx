import React, { useState, useEffect } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';

interface ItemProps {
    initNumber: number;
}

// 1. initNumber需要定义参数类型
export default ({ initNumber = 0 }: ItemProps) => {
    // 2. setstate 需要驼峰标识
    const [state, setState] = useState(initNumber);
    const [flag, setFlag] = useState(true);
    // 因为index中使用了当前组件，所以在index将元素挂载到DOM上都会调用当前组件的useEffect
    // 而这时候EventEmitters中的this.subscriptions = subscription;并未执行，会报错
    // 这里设置了一个flag来控制第一次挂载到DOM不执行useEffect中的回调函数
    useEffect(() => {
        if (!flag) {
            layoutEmitter.emit({ state });
        }
    }, [state])
    // 3.setState() 是异步更新，将layoutEmitter.emit({ state });放在button的点击事件中
    // 会一直拿不到最新的值。解决方法：通过useEffect来实现当state改变把最新的值传给layoutEmitter.emit({ state })
    return <button
        style={{ fontSize: '30px' }}
        onClick={() => {
            setState(state => state + 1)
            setFlag(false)
        }}
    >EventEmitter {state} </button>
};
