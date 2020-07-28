import React, { useEffect, useState } from 'react';
import { layoutEmitter } from '@/utils/EventEmitter';
import EventEmitterButton from '@/components/EventEmitterButton';

export default () => {
    // list需要定义是什么类型的，这里给定Array
    const [list, setList] = useState(Array);

    useEffect(() => {
        layoutEmitter.useSubscription((data) => {
            list.push(data);
            console.log(data);
            console.log(list);
            // 解构（list是引用类型，改变其中的值不会导致重新渲染（因为地址值不会改变），这里的myList不属于引用类型）
            // 第一反应是再设定一个useState值，用来记录list.length，通过这个state来判定是否重新渲染，之后觉得方法太笨了。
            const myList = [...list];
            setList(myList);
        });
    }, []);
    return (
        <div>
            <EventEmitterButton initNumber={11} />
            <p>list length:{list.length}</p>
            {
                // 增加key值
                list.map((item, index) => <p key={index}>{item.state}</p>)
            }
        </div>
    );
};
