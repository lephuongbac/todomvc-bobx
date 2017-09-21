import * as b from 'bobril';
import * as header from './containers/header';
import * as footer from './containers/footer';
import * as main from './containers/main';
import { TodosStore } from './store';

export function createMainPage(store: TodosStore) {
    return b.createComponent<IData>({
        init(): void {
            store.restoreTodo();
        },
        render(_ctx: IContext, me: b.IBobrilNode): void {
            me.tag = 'section';
            me.children = [
                header.create({ store: store }),
                me.data.activeRouteHandler()
            ];
            b.style(me, todoAppStyle);
        }
    });
}

interface IContext extends b.IBobrilCtx {
    data: IData;
}

export interface IData {
    nowShowing: string;
}

export function create(store: TodosStore) {
    return b.createVirtualComponent<IData>({
        init(ctx: IContext): void {
            store.updateNowShowing(ctx.data.nowShowing);
        },
        render(_ctx: IContext, me: b.IBobrilNode): void {
            me.children = [
                !!store.todos.length && main.create({ store }),
                !!store.todos.length && footer.create({ store })
            ];
        }
    });
}

const todoAppStyle = b.styleDef('todoapp');