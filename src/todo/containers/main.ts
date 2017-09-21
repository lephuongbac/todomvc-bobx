import * as b from 'bobril';
import { default as todoList } from '../../components/todoList';
import { default as todoItem } from '../../components/todoItem';
import { default as toggleCheckbox } from '../../components/toggleCheckbox';
import { ACTIVE_TODOS, COMPLETED_TODOS } from './../constants';
import { TodosStore } from '../store';

export let create = b.createVirtualComponent<IData>({
    render(ctx: IContext, me: b.IBobrilNode) {
        me.tag = 'section';
        me.children = createMain(ctx.data.store);
        b.style(me, mainStyle);
    }
});

interface IContext extends b.IBobrilCtx {
    data: IData;
}

export interface IData {
    store: TodosStore;
    value?: b.IBobrilChildren;
}

const mainStyle = b.styleDef('main');

function createMain(store: TodosStore): b.IBobrilNode[] {
    let { todos, nowShowing } = store;
    let shownTodos = todos.filter((todo) => {
        switch (nowShowing) {
            case ACTIVE_TODOS:
                return !todo.isDone;
            case COMPLETED_TODOS:
                return todo.isDone;
            default:
                return true;
        }
    });
    let activeTodoCount = store.activeTodoCount;
    return [
        toggleCheckbox({
            onChange: (value: boolean) => store.toggleTodo(value),
            isChecked: activeTodoCount === 0
        }),
        todoList({
            value: shownTodos.map(item => {
                return todoItem({
                    value: item.name,
                    isChecked: item.isDone,
                    onCheck: () => {
                        store.checkTodo(item.id);
                    },
                    onDelete: () => {
                        store.removeTodo(item.id);
                    }
                });
            })
        })
    ];
}