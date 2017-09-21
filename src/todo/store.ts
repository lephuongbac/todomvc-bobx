import { ALL_TODOS } from './constants';
import { observable } from 'bobx';
import { Utils } from './utils';

const storeKey = 'todomvc';

export class TodosStore {
    @observable private _editedTodo: ITodo = { id: 0, name: '', isDone: false };
    @observable private _nowShowing: string = ALL_TODOS;
    @observable private _todos: ITodo[] = [];
    get todos(): ITodo[] {
        return this._todos;
    }
    get nowShowing(): string {
        return this._nowShowing;
    }
    get editedTodo(): ITodo {
        return this._editedTodo;
    }
    get activeTodoCount(): number {
        return this._todos.reduce(
            function (accum, todo) {
                return todo.isDone ? accum : accum + 1;
            },
            0
        );
    }
    get completedCount(): number {
        return this.activeTodoCount - this.todos.length;
    }
    updateNowShowing(nowShowing: string): void {
        this._nowShowing = nowShowing;
    }
    restoreTodo(): void {
        this._todos = Utils.store(storeKey);
    }
    addTodo(): void {
        let name = this._editedTodo.name.trim();
        if (name) {
            this._todos.unshift({ id: new Date().getTime(), isDone: false, name: name });
            this._editedTodo = { id: 0, name: '', isDone: false };
            Utils.store(storeKey, this._todos);
        }
    }
    updateNewTodoName(name: string): void {
        this._editedTodo.name = name;
    }
    removeTodo(id: number): void {
        this._todos = this._todos.filter(t => t.id !== id);
    }
    checkTodo(id: number): void {
        this._todos.forEach(t => {
            if (t.id === id) {
                t.isDone = !t.isDone;
            }
        });
        Utils.store(storeKey, this._todos);
    }
    toggleTodo(checked: boolean): void {
        this._todos.forEach(t => {
            t.isDone = checked;
        });
        Utils.store(storeKey, this._todos);
    }
    clearCompleted(): void {
        let newTodos = this._todos.filter(t => {
            return !t.isDone;
        });
        this._todos = newTodos;
        Utils.store(storeKey, newTodos);
    }
}

export interface ITodo {
    id: number;
    isDone: boolean;
    name: string;
}