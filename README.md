# Learn redux

- [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)

13, 14, 15 reducer composition 

22, 
Dan说
> 对于FilterLink来说，如果
> - parent component does not update,
> - store update,
>
> 那么，FilterLink的渲染是错误。

中原说：
> 从代码中可以看出如果，parent component没有更新，那么 FilterLink也不会更新。
> 如果store更新了，FilterLink不会重新render，那么这个渲染可能就是不正确的

代码如下：
```javascript
class FilterLink extends React.Component {
    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <Link
                active={
                    props.filter === state.visibilityFilter
                }
                onClick={filter => store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter: props.filter,
                })}
            >
                {props.children}
            </Link>
        );
    }
}
```

23 删除了`store.subscribe(render);`
为什么可以删除？
因为已经在`VisibleTodoList` 和 `FilterLink` 中添加了`subscribe`，不需要重复subscribe了
好处：`AddTodo`永远不会有多余的渲染
