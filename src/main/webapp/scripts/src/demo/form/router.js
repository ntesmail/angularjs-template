angular.module('app.demo.form')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('demo-form-form1', {
                    url: '/demo-form-form1',
                    template: require('./form1/form1.html'),
                    controller: 'app.demo.form.Form1Ctrl',
                    permission: 'form-from1'
                })
                .state('demo-form-form2', {
                    url: '/demo-form-form2',
                    template: require('./form2/form2.html'),
                    controller: 'app.demo.form.Form2Ctrl',
                    permission: 'form-from2'
                })
        }
    ]);