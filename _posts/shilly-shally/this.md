
### this
- gives methods access to their object 
  'this' refers to the object that the function is a property of

  'this' is the object that the function is a property of

- execute same code for multiple objects
  who's calling it. who's calling the function
  who's that person that run me as a function
  what's to the left of the dot


### dynamic & lexical scope
  - Who calls it? All that matters is how it gets called during invocation.
  - 'this' keyword is not lexical scope
  - In javascript our lexical scope (available data + variables where the function was defined) determines our available variables. Not where the function is called (dynamic scope) / *Except for the 'this' keyword*

  ```js
  const obj = {
    name: 'billy',
    sing () {
      console.log('a', this);
      var anotherFunc = function() {
        console.log('b', this)
      }
      anotherFunc()
    }
  } 

  obj.sing() // ??
  ```


  ```js
  const obj = {
    name: 'billy',
    sing () {
      console.log('a', this);
      var anotherFunc = () => {
        console.log('b', this)
      }
      anotherFunc()
    }
  } 

  obj.sing() // ??
  ```

  ```js
  const obj = {
    name: 'billy',
    sing () {
      console.log('a', this);
      var anotherFunc = function() {
        console.log('b', this)
      }
      return anotherFunc.bind(this)
    }
  } 

  obj.sing()() // ??
  ```

### call(), apply() 
#### How would you implement this:
  ```js
  const array = [1, 2, 3];

  function getMaxNumber(arr) {
    // code here
    return Math.max.apply(null, arr);
  }

  getMaxNumber(array) // should return 3
  ```

### bind()
#### function currying
  ```js
  function multiply(a, b) {
    return a * b;
  }

  let multiplyByTwo = multiply.bind(this, 2);
  console.log(multiplyByTwo(4)); // ??
  let multiplyByTen = multiply.bind(this, 10);
  console.log(multiplyByTen(4)); // ??
  ```

#### How would you fix it?
```js
const character = {
    name: 'Summer',
    getCharacter() {
        return this.name;
    }
};
const giveMeTheCharacterNOW = character.getCharacter

console.log('give the character', giveMeTheCharacterNOW()); // this should return 'Summer', but doesn't
```