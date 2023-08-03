# sha3json produces SHA3 hashes of canonicalized stringified JSON

## purpose
The purpose of sha3json is to generate hashes of JSON values in various encodings.

Possible hash bit lengths are:
* 224
* 256
* 384
* 512 (default)

Possible encodings are:
* binary -- returns a Buffer instead of a string
* hex
* base58
* base64 (default)

Unlike base64, Base58 produces hashes without punctuation or ambiguity,
but at the cost of about 10% longer values.

## example usage
```javascript

import {sha3json} from 'sha3json';

const hasher = sha2json(224, 'base58');
const base58hash = hasher([{name:'Alice'}, {name:'Bob'}]);

// to clarify what it does
console.assert(hasher({a:1, b:2})==hasher({b:2, a:1});
console.assert(hasher({a:1, b:2})!=hasher('{"b":2,"a":1}');
console.assert(hasher({a:1, b:2})==hasher('{"a":1,"b":2}');
console.assert(hasher([{b:2, a:1})==hasher('{"a":1,"b":2}');
const base64bits512 = sha2json(512,'base64');
const default_hasher = sha2json();
console.assert(base64bits512([])==default_hasher([]));

const base58bits224 = sha3json(224, 'base58');
const base64bits224 = sha3json(224, 'base64');
console.log(base58bits224([{}])); // 3EnMbauWHQPCzk4GBVxM1t7CKzqoz5D4TEWpjeD
console.log(base64bits224([{}])); // 2Y5XeCeJ/fXGufG5T2XgeBL5GcM8j3c+YLsbng==

```
