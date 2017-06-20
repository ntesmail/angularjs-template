var BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;
angular.module('app.demo.others')
    .factory('app.demo.others.TodoService', ['ajax',
        function (Ajax) {
            var dataStore = {
                todos: []
            };
            var index = 100;
            var service = {
                todoSubject : new BehaviorSubject(),
                updateStoreAndSubject: function (todos) {
                    dataStore.todos = [...todos];
                    this.todoSubject.next(Object.assign({}, dataStore).todos);
                },
                getTodos: function () {
                    Ajax.post('/xhr/todos/getTodos.json').then((data) => {
                        this.updateStoreAndSubject(data)
                    }, () => { });
                },
                addTodo: function (desc) {
                    var todo = {
                        id: ++index,
                        desc: desc,
                        completed: false
                    };
                    Ajax.post('/xhr/todos/addTodo.json', todo).then((data) => {
                        dataStore.todos = [...dataStore.todos, todo];
                        this.todoSubject.next(Object.assign({}, dataStore).todos);
                    }, () => { });
                },
                removeTodo: function (todo) {
                    var i = dataStore.todos.indexOf(todo);
                    Ajax.post('/xhr/todos/removeTodo.json', todo).then(() => {
                        dataStore.todos = [
                            ...dataStore.todos.slice(0, i),
                            ...dataStore.todos.slice(i + 1)
                        ];
                        this.todoSubject.next(Object.assign({}, dataStore).todos);
                    }, () => { });
                },
                toggleTodo: function (todo) {
                    var i = dataStore.todos.indexOf(todo);
                    var updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
                    Ajax.post('/xhr/todos/toggleTodo.json', updatedTodo).then(() => {
                        dataStore.todos = [
                            ...dataStore.todos.slice(0, i),
                            updatedTodo,
                            ...dataStore.todos.slice(i + 1)
                        ];
                        this.todoSubject.next(Object.assign({}, dataStore).todos);
                    }, () => { });
                }
            };
            return service;
        }
    ]);

