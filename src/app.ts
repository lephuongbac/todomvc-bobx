import * as b from 'bobril';
import * as todo from './todo/page';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './todo/constants';
import { TodosStore } from './todo/store';

b.asset('node_modules/todomvc-app-css/index.css');

let store = new TodosStore();

b.routes(
    b.route(
        {
            url: '/',
            handler: todo.createMainPage(store)
        },
        [
            b.route({
                url: '/active',
                name: 'todoActive',
                handler: todo.create(store),
                data: {
                    nowShowing: ACTIVE_TODOS
                }
            }),
            b.route({
                url: '/completed',
                name: 'todoCompleted',
                handler: todo.create(store),
                data: {
                    nowShowing: COMPLETED_TODOS
                }
            }),
            b.routeDefault({
                name: 'default',
                handler: todo.create(store),
                data: {
                    nowShowing: ALL_TODOS
                }
            })
        ]
    )
);