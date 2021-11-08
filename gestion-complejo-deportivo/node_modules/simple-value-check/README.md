## simple value check
> Install

~~~
npm install simple-value-check
~~~

> example

[Example Link.](https://codesandbox.io/s/simple-value-check-wwsyi)

> Usage

```javascript
import vk from 'simple-value-check';

console.log( vk.isObject({}) );
console.log( vk.isFunction(()=>{}) );
console.log( vk.isNumber(1) );
console.log( vk.isString("1") );
console.log( vk.isBoolean(true) );
console.log( vk.isNull(null) );
console.log( vk.isArray([]) );
console.log( vk.isHasOwnProp({a:1}) );
console.log( vk.isNotEmptyString("1"));
console.log( vk.isNotEmptyArray([1]) );
console.log( vk.isExist(2) );
console.log( vk.isUndefined(undefined) );

```

|method|Description|
|------|---|
|isObject|If the constructor of value is an Object, true is returned; otherwise, false is. 
|isFunction|If the constructor of value  is an Function, true is returned; otherwise, false is. 
|isString|If the value is an String, true is returned; otherwise, false is. 
|isBoolean|If the value is an Boolean, true is returned; otherwise, false is. 
|isNull|If the value is an Null, true is returned; otherwise, false is. 
|isArray|If the value is an Array, true is returned; otherwise, false is. 
|isHasOwnProp|If the property exist, true is returned; otherwise, false is. 
|isNotEmptyString|If the value is an String and not empty, true is returned; otherwise, false is. 
|isNotEmptyArray|If the value is an Array and not empty, true is returned; otherwise, false is. 
|isExist|If the value is not null and undefined, true is returned; otherwise, false is. 
|isUndefined|If the value is an undefined, true is returned; otherwise, false is. 


