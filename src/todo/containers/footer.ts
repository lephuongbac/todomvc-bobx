import * as b from 'bobril';
import { link, button } from './../../components/gui';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './../constants';
import { TodosStore } from '../store';

export const create = b.createVirtualComponent<IData>({
    render(ctx: IContext, me: b.IBobrilNode) {
        let { store } = ctx.data;

        me.tag = 'footer';
        me.children = [
            createCount(store.activeTodoCount),
            createFilters(store),
            !!store.completedCount && createClearButton(store)
        ];
        b.style(me, footerStyle);
    }
});

interface IContext extends b.IBobrilCtx {
    data: IData;
}

export interface IData {
    store: TodosStore;
}

function createCount(count: number): b.IBobrilNode {
    let countLabel: b.IBobrilNode = {
        tag: 'span',
        children: [
            { tag: 'strong', children: count },
            { tag: 'span', children: ' ' },
            { tag: 'span', children: count === 1 ? 'item' : 'items' },
            { tag: 'span', children: ' left' }
        ]
    };
    return b.style(countLabel, countStyle);
}

function createFilters(store: TodosStore): b.IBobrilNode {
    let filter: b.IBobrilNode = {
        tag: 'ul',
        children: [
            createLink('All', '', store.nowShowing === ALL_TODOS),
            createLink('Active', 'todoActive', store.nowShowing === ACTIVE_TODOS),
            createLink('Completed', 'todoCompleted', store.nowShowing === COMPLETED_TODOS)
        ]
    };
    return b.style(filter, filterStyle);
}

function createLink(label: string, url: string, isSelected?: boolean): b.IBobrilNode {
    let linkNode: b.IBobrilNode = link({
        label: label,
        link: url
    });
    return {
        tag: 'li',
        children: isSelected ? b.style(linkNode, selectedStyle) : linkNode
    };
}

function createClearButton(store: TodosStore): b.IBobrilNode {
    return b.style(
        button(
            {
                value: 'Clear completed',
                onClick: () => {
                    store.clearCompleted();
                }
            }
        ),
        clearButtonStyle
    );
}

const footerStyle = b.styleDef('footer');
const countStyle = b.styleDef('todo-count');
const filterStyle = b.styleDef('filters');
const clearButtonStyle = b.styleDef('clear-completed');
const selectedStyle = b.styleDef('selected');