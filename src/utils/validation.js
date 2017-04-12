const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function qs(key) {
  var vars = [], hash;
  var hashes; // = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
  if (typeof window != "undefined") {
    hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');

  }
  else {
    hashes = 'id:57413ffe7a1d3a001111b3ec';
  }

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split(':');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars[key];
}

export function isProductExistsInCart(cartItems,item)
{
  if(cartItems== undefined || cartItems.length==0)
  {
    return false;
  }
  else
  {
var result = cartItems.reduce(function(map, obj) {
    map[obj._id] = obj;
    return map;
}, {});
var found = result[item._id];
if(found==undefined)
{
  return false;
}
else
{
  return true;
}
console.log(result);
  }
}

function filterByID(prd,s) {
  if (item._id==item._id) {
    return true;
  }
  return false;
}
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


