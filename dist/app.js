angular.module("sampleJenkinsApp",["ngRoute","ngResource","ngSanitize","ngMessages","ui.router","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(a,b,c,d){a.state("app",{abstract:!0,templateUrl:"src/app.html"}),b.otherwise("/"),c.html5Mode(!0),d.interceptors.push("HttpNormalizer")}]),angular.module("sampleJenkinsApp").factory("HttpNormalizer",["$q",function(a){return{responseError:function(b){if(!b)return a.reject(b);var c=(b.status,b.data||{});return c.stack&&alert(c.stack),a.reject(c)}}}]),angular.module("sampleJenkinsApp").factory("Thing",["$resource",function(a){return a("/api/thing/:id/:controller",{id:"@_id"},{})}]),angular.module("sampleJenkinsApp").config(["$stateProvider",function(a){a.state("app.create",{url:"/create",templateUrl:"src/states/create/create.html",controller:"CreateCtrl as $thingCtrl"})}]).controller("CreateCtrl",["$scope","$state","Thing",function(a,b,c){a.model=new c,a.submit=function(){return a.model.$save().then(function(a){return b.go("app.default"),a})}}]),angular.module("sampleJenkinsApp").config(["$stateProvider",function(a){a.state("app.default",{url:"/",templateUrl:"src/states/default/default.html",controller:"DefaultCtrl as $defaultCtrl"})}]).controller("DefaultCtrl",["$scope","Thing",function(a,b){var c=!1,d=this;this.markLoading=function(){return c=!0,this},this.markFinished=function(){return c=!1,this},Object.defineProperties(a,{isLoading:{get:function(){return c}}}),a.reload=function(){return d.markLoading(),b.query().$promise.then(function(b){return a.things=b,d.markFinished(),b})}}]),angular.module("sampleJenkinsApp").config(["$stateProvider",function(a){a.state("app.delete",{url:"/delete/:id",templateUrl:"src/states/delete/delete.html",controller:"DeleteCtrl as $thingCtrl",resolve:{currentThing:["$stateParams","Thing",function(a,b){return b.get(a).$promise.catch(function(a){return!1})}]}})}]).controller("DeleteCtrl",["$scope","$state","currentThing",function(a,b,c){a.thing=c,a.confirm=function(){return c.$remove().then(function(a){return b.go("app.default"),a})}}]),angular.module("sampleJenkinsApp").config(["$stateProvider",function(a){a.state("app.detail",{url:"/detail/:id",templateUrl:"src/states/detail/detail.html",controller:"DetailCtrl as $thingCtrl",resolve:{currentThing:["$stateParams","Thing",function(a,b){return b.get(a).$promise.catch(function(a){return!1})}]}})}]).controller("DetailCtrl",["$scope","$state","currentThing",function(a,b,c){a.thing=c,a.saveChanges=function(){return c.$save().then(function(a){return b.go("app.default"),a})}}]),angular.module("sampleJenkinsApp").run(["$templateCache",function(a){"use strict";a.put("src/app.html",'<div class=container><div class="page-header text-center"><h1>Sample Jenkins App</h1></div><div ui-view=""><p>Please wait, loading view..</p></div></div>'),a.put("src/states/create/create.html",'<form ng-submit=submit()><dl><dt>Name of thing:</dt><dd><input class="form-control input-lg" ng-model=model.name placeholder=Something..></dd></dl><dl><div class=btn-group><button class="btn btn-lg btn-success" type=submit>Create</button> <button class="btn btn-lg btn-default" type=button ui-sref=app.default>Cancel</button></div></dl></form>'),a.put("src/states/default/default.html",'<div class=state-default ng-init=reload()><div ng-switch on=isLoading><div ng-switch-when=true class=text-center><p>Please wait, loading things..</p></div><div ng-switch-default><div ng-if="things.length > 0"><div class="row spaced-row" ng-repeat="thing in things"><div class=col-xs-9><a class=link-row ui-sref="app.detail({ id: thing._id })" ng-bind=thing.name></a></div><div class="col-xs-3 text-right"><button class="btn btn-danger" ui-sref="app.delete({ id: thing._id})"><span class="glyphicon glyphicon-remove"></span> <span class=hidden-xs>Remove</span></button></div></div></div><div ng-if="things.length === 0" class=text-center><p>There are currently no things available, try <a ui-sref=app.create>adding one</a>.</p></div><hr><button class="btn btn-lg btn-success" ui-sref=app.create><span class="glyphicon glyphicon-plus"></span> Create new</button></div></div></div>'),a.put("src/states/delete/delete.html",'<p ng-if=!thing>Unable to locate the thing you\'re looking for.</p><div ng-if=thing class=text-center><p class=lead>Are you sure you want to <u class=text-danger>remove</u> <mark>{{thing.name}}</mark> permanently?</p><button class="btn btn-lg btn-danger" ng-click=confirm()><span class="glyphicon glyphicon-ok"></span> Yes</button> <button class="btn btn-lg btn-default" ui-sref=app.default><span class="glyphicon glyphicon-remove"></span> No</button></div>'),a.put("src/states/detail/detail.html",'<p ng-if=!thing>Unable to locate the thing you\'re looking for.</p><div ng-if=thing><form name=detailForm ng-submit=saveChanges()><table class="table borderless"><tr><td align=right><b>ID:</b></td><td ng-bind=thing._id></td></tr><tr><td align=right><b>Name:</b></td><td><input class=form-control ng-model=thing.name></td></tr><tr><td align=right><b>Created:</b></td><td ng-bind="thing.createdAt|date:\'short\'"></td></tr><tr ng-if="thing.updatedAt !== thing.createdAt"><td align=right><b>Updated:</b></td><td ng-bind="thing.updatedAt|date:\'short\'"></td></tr><tr ng-show=detailForm.$dirty><td></td><td><button type=submit class="btn btn-success">Save changes</button></td></tr></table></form></div><hr><a ui-sref=app.default><span class="glyphicon glyphicon-backward"></span> Go back and view all</a>')}]);
//# sourceMappingURL=app.js.map