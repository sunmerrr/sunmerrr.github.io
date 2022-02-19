# getter와 setter

- 자바스크립트는 프로퍼티를 생성하면서 자동으로 프로퍼티 어트리뷰트 값을 정의한다.
- 프로퍼티 어트리뷰트는 console.log를 찍었을때 보이는 `[[Prototype]]`, `[[Value]]` 등의 값이라고 생각해주면 된다.
- 우리가 잘 알고있는 getter와 setter도 자바스크립트에서 프로퍼티 생성 시 자동으로 생상되는 접근자 함수이다.

<br>

## Get

  - Get 은 우리가 흔히 아는 getter를 뜻하는 함수로 프로퍼티의 값을 읽는 역할을 한다.

  - 예시
    ```
    const obj = {
      firstName: 'summer',
      lastName: 'Kim', 

      get fullName() {
        return `${this.firstName} ${this.lastName}`
      }
    };

    console.log(obj.fullName);  // 'summer Kim'

    ```
<br>

## Set

  - Set 은 setter를 뜻하며 프로퍼티의 값을 저장할때 호출한다.

  - 예시
    ```
    const obj = {
      firstName: 'summer',
      lastName: 'Kim', 

      set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
      }
    };

    obj.fullName = 'winter Kim'

    console.log(obj.fullName);  // 'winter Kim'

    ```
<br>

## 프로퍼티 어트리뷰트

  - 프로퍼티 어트리뷰트란 프로퍼티의 상태를 나타내며, 자바스크립트가 자동으로 정의한다.
  - 프로퍼티 어트리뷰트는 프로퍼티 디스크립터(Properdy Descriptor) 객체를 통해서 간접적으로만 접근이 가능하며, 직접적으로는 접근할 수 없다.
  - 프로퍼티 디스크립터를 통해서 네가지의 상태와 두가지의 함수를 출력해볼 수 있다.
    **1. value** : 프로퍼티의 키 값에 정의되어있는 value 값이다. <br>
    **2. writable** : 값의 변경 가능 여부를 나타내 준다. boolear 값이다. <br>
    **3. enumerable** : 열거 가능 여부를 나타내 준다. boolear 값이다. <br>
    **4. configurable** : 재정의 가능 여부를 나타내며 이또한 boolear 값이다. <br>
    **5. Get** : get 메소드이며, 프로퍼티의 값을 읽을때 사용된다. <br>
    **6. Set** : set 메소드이며, 프로퍼티의 값은 저장할때 사용된다. <br>
  - 위의 6가지 프로퍼티 어트리뷰트는 두가지의 다른 프로퍼티에서 작동한다.
   <br>
   
  ### 데이터 프로퍼티

    - 데이터의 상태를 나타내주는 프로퍼티이다.
    - 1 ~ 4번의 프로퍼티 어트리뷰트가 정의된다.
    - 값과 키로 이루어져 있다.

    - 예시
      
      - `Object.getOwnPropertyDescriptor`

        ``` 
        const me = {
          name: 'summer',
        };

        console.log(Object.getOwnPropertyDescriptor(me, 'name'));
        // {value: 'summer', writable: true, enumerable: true, configurable: true} 출력

        ```

      - `Object.getOwnPropertyDescriptors`

        ```
        const me = {
          name: 'summer',
          age: 19,
        };

        console.log(Object.getOwnPropertyDescriptors(me));
        /* {
          name: {value: 'summer', writable: true, enumerable: true, configurable: true},
          age: {value: 19, writable: true, enumerable: true, configurable: true}
        } 여러 값 출력 */ 

        ```
      
      - 참고: [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
     <br>

  ### 접근자 프로퍼티

    - 데이터 프로퍼티의 값을 읽거나 저장할때 사용하는 접근자 함수로 구성되어있다.
    - 자체적으로 값을 갖지 않는다.
    - 위에서 설명한 get과 set 그리고 3, 4번으로 구성된 프로퍼티이다.
    - get과 set은 하나만 사용할 수도 있고 동시에 사용할 수도 있다.
    
    - 예시
      ```
      const obj = {
        firstName: 'summer',
        lastName: 'Kim', 

        get fullName() {
          return `${this.firstName} ${this.lastName}`
        },

        set fullName(name) {
          [this.firstName, this.lastName] = name.split(' ');
        }
      };

      console.log(obj.fullName);  // 'summer Kim'
      obj.fullName = 'winter Kim';
      console.log(obj.fullName);  // 'winter Kim'

      console.log(Object.getOwnPropertyDescriptor(obj, 'firstName'));
      // {value: 'summer', writable: true, enumerable: true, configurable: true} 출력

      console.log(Object.getOwnPropertyDescriptor(obj, 'fullName'));
      // {enumerable: true, configurable: true, get: ƒ, set: ƒ} 출력
      ```
       <br>

  ### 프로퍼티의 정의

    - 위의 프로퍼티는 따로 정의가 가능하다.
    - 프로퍼티를 새로 만들거나 재정의 하는 방식이다.
    - `Object.defineProperty` 를 통해서 정의 또는 재정의한다.

    - 예시
      ```
      const me = {};

      Object.defineProperty(me, 'firstName', {
        value: 'summer',
        writable: true,
        enumerable: true,
        configurable: true
      });

      Object.defineProperty(me, 'lastName', {
        value: 'Kim'
      });

      console.log(Object.getOwnPropertyDescriptors(me));
      /* {
      firstName: {value: 'summer', writable: true, enumerable: true, configurable: true}
      lastName: {value: 'Kim', writable: false, enumerable: false, configurable: false}  
      } */
      ```

      - 프로퍼티를 정의하면서 디스크립터를 생략하게 되면 boolear의 값은 false로, 접근자 함수와 value는 undifined로 기본값을 갖게 된다.
      - writable, enumerable, configurable도 undefined로 정의되며, undefined는 false 값이기 때문에 결과적으로 false를 기본값으로 갖게 된다.
      - `Object.defineProperties`를 사용하여 여러개의 프로퍼티를 한번에 정의 할 수 있다.
      - 참고: [Object.defineProperty()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 
       <br>
       
    #### 프로퍼티 어트리뷰트의 특징

      - 프로퍼티 어트리뷰트는 그 특징에 따라서 false일때와 true일때 객체에 미치는 영향이 다른다.
        
        1. writable : 할당을 통해서 값의 변경 가능 여부를 타나내준다.
          - 기본값 false
            ```
            me.firstName = 'winter';
            me.lastName = 'Lee';

            console.log(me);  // {firstName: 'winter', lastName: 'Kim'} 
            // lastName은 writable이 false 임으로 할당을 통해 값의 변경이 불가능하다.
            ```

        2. enumerable : 열거 가능 여부를 나타내 준다.
          - 기본값 false
            ```
            console.log(Object.keys(me));  // ['firstName']
            // lastName은 enumerable이 false 일때 for ...in 문이나 Object.keys 등으로 열거되지 않는다.
            ```

        3. configurabel : 속성의 값 변경과 삭제 가능 여부를 타나내준다.
          - 기본값 false
            ```
            delete me.lastName;
            console.log(me);  // {firstName: 'winter', lastName: 'Kim'}
            // lastName의 configurable이 false임으로 삭제가 불가능하다.
            // writable이 true인 경우에는 값의 변경과 writable을 false로 변경하는 것이 가능하다.
            ```

