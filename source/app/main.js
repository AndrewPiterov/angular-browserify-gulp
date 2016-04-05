require("angular");

var MainCtrl = require("./controllers/MainCtrl");

var app = angular.module("app", []);

app.controller("MainCtrl", ["$scope", MainCtrl]);