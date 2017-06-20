angular.module('app.demo.others')
    .controller('app.demo.others.TodoCtrl', ['$scope', 'app.demo.others.TodoService',
        function ($scope, TodoService) {
            $scope.todosObservable = TodoService.todoSubject.asObservable();
            // $scope.todoSubscription = TodoService.todoSubject.asObservable().subscribe(
            //     (todos) => {
            //         $scope.todos = todos;
            //     }
            // );
            // $scope.$on('$destroy', () => {
            //     console.log('------------destroy scope subscription------------');
            //     $scope.todoSubscription.unsubscribe();
            // });

            $scope.desc = '';

            $scope.addTodo = function (event) {
                if (event.keyCode === 13) {
                    TodoService.addTodo($scope.desc);
                }
            }

            $scope.removeTodo = function (todo) {
                TodoService.removeTodo(todo);
            }

            $scope.toggleTodo = function (todo) {
                TodoService.toggleTodo(todo);
            }

            TodoService.getTodos();
        }
    ]);
