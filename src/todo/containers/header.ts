
import * as b from 'bobril';
import { input } from './../../components/gui';
import { TodosStore } from '../store';

export const create = b.createVirtualComponent<IData>({
    render(ctx: IContext, me: b.IBobrilNode) {
        let { store } = ctx.data;
        me.children = createContent(store);
        me.tag = 'header';
        b.style(me, headerStyle);
    }
});

interface IContext extends b.IBobrilCtx {
    data: IData;
}

export interface IData {
    store: TodosStore;
}

function createContent(store: TodosStore): b.IBobrilNode[] {
    let { editedTodo } = store;    
    return [
        headerLabel,
        input({
            placeholder: 'What needs to be done?',
            onChange: (value: string) => {
                store.updateNewTodoName(value);
            },
            value: editedTodo.name,
            onEnter: () => store.addTodo()
        })
    ]
}

let headerLabel: b.IBobrilNode = {
    tag: 'h1',
    children: 'todos'
};

const headerStyle = b.styleDef('header');


