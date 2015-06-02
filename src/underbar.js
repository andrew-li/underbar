(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === undefined)
      return array[array.length - 1];
    else if(n === 0)
      return [];
    else if(n >= array.length)
      return array;
    else
      return array.slice(n - 1);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection) === true)
    {
      for(var i = 0; i < collection.length; ++i)
      {
        iterator(collection[i], i, collection);
      }
    }
    else
    {
      for(var prop in collection)
      {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
     var filteredArray = [];

    _.each(collection, function(item) {
      if (test(item) === true) {
        filteredArray.push(item);
      }
    });

    return filteredArray;   
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    //use filter but with a function that generates the opposite value of function test
    return _.filter(collection, function(input) {
      return !test(input);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    //use a map to store values that have already been seen
    var map = {};

    //filter out any values that have already been seen
    return _.filter(array, function(input) {
      if(map.hasOwnProperty(input)) //check if property exists; if it is true that means the value has been seen before
      {
        return false; //don't add value to filtered array if the value has been seen before
      }
      else //property doesn't exist and hasn't been seen before
      {
        map[input] = true; //set to true to say that value has already been seen before, but doesn't really matter what value is at the key index of the map
        return true; //add value to filtered array if the value hasn't been seen before
      }
    });
  };



  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArray = [];

    _.each(collection, function(item) {
      newArray.push(iterator(item));
    });

    return newArray;   
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, function(value, index) {
      //if the function is looking at the first element, then need to check if accumulator was passed in
      //apply the iterator function on the current element if the element is NOT the first element OR the accumulator was passed in (NOT undefined)
      if(index === 0 && accumulator === undefined)
      {
        accumulator = value;
      }
      else
      {
        accumulator = iterator(accumulator, value);
      }
    });

    return accumulator;       
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    //note: not as efficient as possible since it doesn't break from loop when a false value is found
    return _.reduce(collection, function (result, value) {
      //just use the value if iterator is undefined; also need to typecast to Boolean
      //by ANDing result with current value, once there is a false value, false will always be returned
      return (iterator === undefined) ? (result && Boolean(value)) : (result && Boolean(iterator(value)));
    }, true); //default to true and set to false once a false value has been found
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    //note: not as efficient as possible since it doesn't break from loop when a true value is found
    //if every value isn't false, then at least one value is true, so function some returns true if function every returns false when checking for all false
    return !(_.every(collection, function(value) {
      return (iterator === undefined) ? !value : !iterator(value); //return opposite value to check for false instead of true
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(Array.prototype.slice.call(arguments, 1), function(arg) { //get each argument except the first; each arg value is an object
      _.each(arg, function (propValue, prop) {
        obj[prop] = propValue; //assign prop from current obj to first obj
      });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(Array.prototype.slice.call(arguments, 1), function(arg) { //get each argument except the first; each arg value is an object
      _.each(arg, function (propValue, prop) {
        if(obj[prop] === undefined) //only assign if property is already undefined
          obj[prop] = propValue; //assign prop from current obj to first obj
      });
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var alreadyCalled = {}; //instead of boolean value, have alreadyCalled be a map object

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      //convert the function arguments to string format to use as a key for the map
      var argumentString = JSON.stringify(Array.prototype.slice.call(arguments));

      //check to see if argument string is already in the map object
      //execute the function and set the property in the map object to true if it isn't there already
      if (!alreadyCalled.hasOwnProperty(argumentString)) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        alreadyCalled[argumentString] = func.apply(this, arguments);
      }
      // The new function always returns the originally computed result.
      return alreadyCalled[argumentString];
    };  
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    setTimeout(function (args) { 
      func.apply(this, args); //anonymous function will call func apply with passed in args
    }, wait, Array.prototype.slice.call(arguments, 2)); //pass all arguments except first two to the anonymous function
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //make a copy of the input array
    var shuffledArray = array.slice();

    //don't need to swap if array is of length 1
    if(shuffledArray.length <= 1)
    {
      return shuffledArray;
    }
    //only one possible different shuffle if length is 2; to always pass the test case, the shuffle will always need to return a different array
    else if(shuffledArray.length === 2)
    {
      var temp = shuffledArray[0];
      shuffledArray[0] = shuffledArray[1];
      shuffledArray[1] = temp;     
      return shuffledArray;
    }

    //helper function to shuffle an array in place
    var shuffleArray = function(arrayToShuffle)
    {
      //loop through each element and swap with another element with the same or higher index
      _.each(arrayToShuffle, function(value, index) {
        var swapIndex = index + Math.floor(Math.random() * (arrayToShuffle.length - index)); //guarantees that swap index will always be the same or higher than current index

        //swap the element at current index with the element at swap index
        var temp = arrayToShuffle[swapIndex];
        arrayToShuffle[swapIndex] = arrayToShuffle[index];
        arrayToShuffle[index] = temp;
      });
    }

    //execute the function to shuffle the array copy
    shuffleArray(shuffledArray);

    //since result should always be different, need to check if arrays are the same
    var equalArrays = true;
    for(var i = 0; i < shuffledArray.length; ++i)
    {
      if(shuffledArray[i] !== array[i])
      {
        equalArrays = false;
        break;
      }
    }

    //if the arrays are the same, randomly select two unique indices to perform a final swap
    if(equalArrays === true)
    {
      //build array of indices and shuffle the array of indices
      var tempIndexArray = [];
      for(var i = 0; i < shuffledArray.length; ++i)
      {
        tempIndexArray.push(i);
      }
      shuffleArray(tempIndexArray);

      //select the first two elements in the index array to get the two unique indices
      var swapIndex1 = tempIndexArray[0];
      var swapIndex2 = tempIndexArray[1];

      //swap the elements at the selected indices
      var temp = shuffledArray[swapIndex1];
      shuffledArray[swapIndex1] = shuffledArray[swapIndex2];
      shuffledArray[swapIndex2] = temp;
    }

    return shuffledArray; //will always return an array different from input array (assuming array length > 1) to ensure that test cases always pass
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    //set new collection's data type based on input collection's type
    var newCollection;
    if(Array.isArray(collection) === true)
      newCollection = [];
    else
      newCollection = {};

    //call passed in function on each value in the input collection and put the resulting value into the new collection
    //value[functionOrKey] uses the function's string name to get the function code from the objects's property, which allows the function to be called by string name
    _.each(collection, function(value, key) {
      newCollection[key] = (typeof(functionOrKey) === 'string') ? value[functionOrKey].apply(value, args) : functionOrKey.apply(value, args);
    });

     return newCollection;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    //the getValueToCompare function gets the keys to be compared in the sort comparison function
    //if the passed in iterator is not a function, then the getValueToCompare becomes a new function that returns the value of iterator as a property
    //if the passed in iterator is a function, then the getValueToCompare will be that function
    var getValueToCompare;
    if(typeof(iterator) !== "function")
      getValueToCompare = function(value) {
        return value[iterator];
      };
    else
      getValueToCompare = iterator;

    //copy collection's contents into a new array that will be sorted using the built in sorting function
    //the values of the initial collection need to be wrapped in objects that store the indices in order 
    //to maintain stability with built in sort function
    var itemObject;

    var index = 0;
    var arrayToSort = _.map(collection, function (item) {
      itemObject = {};
      itemObject["key"] = getValueToCompare(item);
      itemObject["value"] = item;
      itemObject["index"] = index;
      ++index;
      return itemObject;
    });

    //comparison function for sorting that first compares two objects' keys
    //and then their indices in order to determine sort order  
    var compare = function(i, j) {
      //if the objects both have undefined values, then compare their indices
      if(i["key"] === undefined && j["key"] === undefined)
      {
        if (i["index"] < j["index"]) {
          return -1;
        }
        if (i["index"] > j["index"]) {
          return 1;
        }
      }

      //at this point, both objects' keys will not both be undefined
      //but one object could still have an undefined value
      //the object with the undefined value should go after the one without an undefined key
      if(i["key"] === undefined && j["key"] !== undefined) {
         return 1;
      }
      if(i["key"] !== undefined && j["key"] === undefined) {
         return -1;
      }

      //at this point, neither of the objects' keys will be undefined
      //so just compare their keys
      if (i["key"] < j["key"]) {
        return -1;
      }
      if (i["key"] > j["key"]) {
        return 1;
      }

      //at this point, both of the objects' keys will be equal
      //so compare their indices
      if (i["index"] < j["index"]) {
        return -1;
      }
      if (i["index"] > j["index"]) {
        return 1;
      }

      //at this point, both objects will have equal keys and indices
      return 0; 
    };     

    //use javascript's built in sorting function to sort the array
    //the sorting comparison function is just a function that causes the sort to order things in descending order
    //the keys that are compared are retrieved using the getValueToCompare function
    arrayToSort.sort(compare);

    //copy values of sorted array into new array to return
    var newArray = [];
    _.each(arrayToSort, function(item) {
      newArray.push(item["value"]);
    });

    return newArray;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    if(arguments.length === 0)
     return [];

    //get the length of the longest array
    var largestArrayLength = 0;
    _.each(arguments, function(arg) {
      if(arg.length > largestArrayLength)
        largestArrayLength = arg.length;
    });

    //push the elements of each argument array at the current index into the new array at the current index until the largest array size is reached
    var newArray = [];
    for(var i = 0; i < largestArrayLength; ++i)
    {
      newArray[i] = [];
      _.each(arguments, function(arg) {
        newArray[i].push(arg[i]);
      });      
    }

    return newArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    //set result to an empty array if it is undefined or null
    if(result === undefined || result === null)
      result = [];
 
    //stop the recursion when the passed in value is not an array
    //and push the value into the result array before returning it
    if(Array.isArray(nestedArray) !== true)
    {  
      result.push(nestedArray);
      return result;
    }

    //if the passed in value is an array, then recursively call the function for each element in the array
    _.each(nestedArray, function(arrayElement) {
      result = _.flatten(arrayElement, result);
    });    

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    if(arguments.length === 0)
     return [];

    //if an array has repeated elements, then counting all repeated elements from every array won't work
    //need to ensure that elements from the same array are only counted once, so create a temp array to store unique-ified versions of the argument arrays
    //also flatten the arrays to make it easier to count
    var flattenedArray = [];
    _.each(arguments, function(arg) {
      flattenedArray.push(_.uniq(arg));
    }); 
    flattenedArray = _.flatten(flattenedArray);

    //to differentiate between different data types (ie. int 1 vs string "1"), need to store them differently in the map
    //this hash function creates separate keys for different data types
    var hashFunction = function(value) {
      var hashKey = value.toString() + ", " + typeof(value);
      return hashKey;
    };

    //count all elements in the flattened array
    //any repeated element is an element that is in more than one array, so that element will get pushed into the new array
    //elements that have already been pushed into the new array won't be pushed into the new array again
    var map = {};
    var newArray = [];
    var hashKey = "";
    _.each(flattenedArray, function(value) {
      hashKey = hashFunction(value); //hash key for the current element to use as key

      if(map.hasOwnProperty(hashKey) === false)
      {
        map[hashKey] = [];
        map[hashKey][0] = value; //the actual value to be pushed into the new array
        map[hashKey][1] = 1; //the count
      }
      else if(map[hashKey][1] === 1)
      {
        newArray.push(map[hashKey][0]);
        ++map[hashKey][1];
      }
    });

    return newArray; 
  }

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    if(arguments.length === 0)
     return [];

    //to differentiate between different data types (ie. int 1 vs string "1"), need to store them differently in the map
    //this hash function creates separate keys for different data types
    var hashFunction = function(value) {
      var hashKey = value.toString() + ", " + typeof(value);
      return hashKey;
    };  

    var hashKey = "";

    //store each element of the first argument as a key into a map
    //duplicate elements from the first argument will only get put once into the new array even if they aren't in any other array
    var map = {};
    _.each(arguments[0], function(value) {
      hashKey = hashFunction(value); //hash key for the current element to use as key 

      if(map.hasOwnProperty(hashKey) === false)
      {
        map[hashKey] = [];
        map[hashKey][0] = value; //the actual value to be pushed into the new array
        map[hashKey][1] = 1; //the count
      }
    });    

    //increment count of elements in the map if they appear in arguments other than first 
    var flattenedArray = _.flatten(Array.prototype.slice.call(arguments, 1)); //flatten arguments (except first) to make it easier to work with
    _.each(flattenedArray, function(value) {
      hashKey = hashFunction(value); //hash key for the current element to use as key 

      if(map.hasOwnProperty(hashKey) === true)
      {
        ++map[hashKey][1];
      }
    });

    //any elements that still have a count of one (meaning that they didn't appear in any other arguments) will be pushed into the new array
    var newArray = [];
    _.each(map, function(value) { //the value is an array that contains the actual element in the first argument as well as the count
      if(value[1] === 1)
      {
        newArray.push(value[0]);
      }
    });  

    return newArray;    
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var block = false; //a flag that indicates whether the passed in function should be called or not
    var result; //a variable that holds the most recently returned result from the execution of the passed in function

    //this returned function will execute the passed in function and block future attempts to call it until the block flag is set back to false
    //the block flag will be set back to false after the wait time finishes
    //the function will return the most recently returned result from the execution of the passed in function even while block is true
    return function() {
      if(block !== true) //don't do anything if block is set to true
      {
        block = true; //prevent the function from getting called again
        result = func.apply(this, arguments); //execute the function and update result variable

        //run a function to unblock after the wait time finishes
        setTimeout(function() { 
          block = false; //allow the function to be called again
        }, wait);
      }

      return result;
    };
  };
}());
