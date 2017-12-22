
Based on [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

01 很简单，ES6语法问题

02 createStore可以接受第二个参数preloadedState, 

    - preloadedState是一个对象，
    - 根据对象的key，把key对应的value传给对应的reducer
    - 如果value为undefined，则不传递
03 数据持久化

    - localStorage 持久化 
    - lodash.throttle 防止过于频繁的保存数据
    - uuid 保证id的唯一性

04 重构createStore及相关代码（Refactoring the Entry Point）

05 引入react-router

06 引入Link