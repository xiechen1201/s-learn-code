"use strict";[1,2,3,4,5].forEach(function(n){console.log(n)});var person={name:"张三",age:20};new Proxy(person,{get:function(n){return person[n]}});