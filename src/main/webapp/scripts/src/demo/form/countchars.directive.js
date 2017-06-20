angular.module('app.demo.form')
	.directive('demoFormCountchars', ['common', '$timeout',
		function (Common, $timeout) {
			return {
				restrict: 'A',
				require: '?ngModel',
				link: function ($scope, element, attrs, ngModelCtrl) {
					var elementJq = SharkUI.$(element);
					var maxlimit = parseInt(attrs.maxLimit);
					var leftcountId = Common.createUUID();
					var leftcountEle = elementJq.after('<div class="text-right">还可以输入<span id=' + leftcountId + '>' + maxlimit + '</span>个字</div>').parent().find('#' + leftcountId);
					// 作为演示，这里使用事件监听实现
					// 当然，也可以直接监听ng-model实现，比较简单。
					// 事实上ng-model内部也是通过监听以下事件来处理的。
					var isComposing = false;
					elementJq.on('input', function () {
						textCounter();
					})
					elementJq.on('compositionstart', function () {
						isComposing = true;
						textCounter();
					})
					elementJq.on('compositionend', function () {
						isComposing = false;
						textCounter();
					})
					$timeout(textCounter, 0);
					function textCounter() {
						if (isComposing) {
							return;
						}
						var nv = elementJq.val();
						if (nv.length > maxlimit) {
							var subValue = nv.substr(0, maxlimit);
							nv = subValue;
							elementJq.val(nv);
							ngModelCtrl && ngModelCtrl.$setViewValue(nv);
						}
						leftcountEle.text(maxlimit - nv.length);
					}
				}
			};
		}
	]);