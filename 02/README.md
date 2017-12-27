
Based on [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

01 很简单，ES6语法问题

02 createStore可以接受第二个参数preloadedState, 

    - preloadedState是一个对象，
    - 根据对象的key，把key对应的value传给对应的reducer
    - 如果value为undefined，则不传递
03 数据持久化

    - localStorage 持久化 
    - lodash.throttle 防止过于频繁的保存数据(因为stringify is expensive)
    - uuid 保证id的唯一性
   

04 重构createStore及相关代码（Refactoring the Entry Point）

05 引入react-router

06 引入Link

07 Filtering Redux State with React Router Params(必须使用react-router@2,其他版本都会出点小问题)

- 删除了visibilityFilter(reducer)
- getVisibleTodos的第二个参数由visibilityFilter改为ownProps.filter, filter由`App`而来, `App`中的`filter`由react-router传进来
- webpackDevServer historyApiFallback true

08 Using withRouter()

- 07的代码是有点不合理的：`App.js`中写了`filter={params.filter || 'all'}`，但是`App`本身不用`filter`。应当把`filter`相关代码写在真正用的地方`VisibleTodoList.js`

09 Using mapDispatchToProps() Shorthand Notation

简写`mapDispatchToProps`，没啥新东西

10 selector

- 介绍了selector的概念。reducer中的其他函数。例如`todos.js`的`getVisibleTodos`
- 更好的分离代码

11 refactoring state shape(难，难，难)

背景(Why I treat my state as a database?)
- There may be more than a single array in real app
- todos with the same IDs in different arrays might get out of the think

keep todos in an object indexed by the IDs of the todos.

- Rename the reducer to `byId`,
- rather than add a new item at the end or map over every item,
- now it's going to change the value in the lookup table.

I want to return a new lookup table  


allIds is array of `ids` rather than array of `todos`.

Update the selector that rely on it.

todos成为了一个对象，包含`allIds`和`byId`

12 添加函数`addLoggingToDispatch`
有两点很巧妙
- 1
```javascript
const rawDidpatch = store.dispatch;
if (!console.group) {
    return rawDidpatch;
}
```
- 2
```javascript
const returnValue = rawDidpatch(action);
return returnValue;
```
Dan写代码水平高！

13 删除localStorage相关代码，添加fake backend


16 Wrapping dispatch() to Recognize Promises

**问题：**

```javascript
// VisibleTodoList.js

fetchTodos(filter).then((todos) => {
    receiveTodos(filter, todos);
});
```
这段代码不是那么useful，因为
- 每当我调用这段代码的时候，我都会首先fetchTodos
- `fetchTodos`和`receiveTodos`接受同样的的参数`filter`

如果我们能够把这段代码放到 a single action creator, 会更好。

**修改：**
- 添加 active creator `fetchTodos`(异步)
```javascript
export const fetchTodos = filter =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response));
```
- Add function `addPromiseSupportToDispatch`，用来解决action creator可能是同步也可能是**异步**

## 17 The Middleware Chain

We will learn how we can generalize(概括) wrapping dispatch() for different purposes into a concept called “middleware” that is widely available in the Redux ecosystem.

引入了Middleware概念

关于middleware顺序:
> it would be more natural to specify the order in which the action propagates through the middlewares.

## 18 Applying Redux Middleware

We will learn how to replace the middleware we wrote and the custom code we used to glue it together with the existing core and third party utilities.

## 19 Updating the State with the Fetched Data

We will learn how moving the source of truth for the data to the server changes the state shape and the reducers in our app.

把所有的内容

## 20 Refactoring the Reducers

We will learn how to remove the duplication in our reducer files and how to keep the knowledge about the state shape colocated with the newly extracted reducers.

## 21 Displaying Loading Indicators

We will learn how to display the loading indicators while the data is being fetched.
