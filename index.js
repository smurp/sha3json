import { SHA3 } from 'sha3';
import { default as canonicalize } from 'canonicalize';
import { default as bs58 } from 'bs58';

function sha3json(sha3ver=512, encoding='base64') {
  let hash = new SHA3(sha3ver);
  return function(input) {
    let digest;
    let input_is = input.constructor.name;
    if (input_is == 'String') { // Strings are assumed to be canonical
      hash.update(input);
    } else { // Arrays and Objects are canonicalized
      hash.update(canonicalize(input));
    }
    if (encoding == 'base58') {
      digest = bs58.encode(hash.digest());
    } else { // hex, base64
      digest = hash.digest(encoding);
    }
    hash.reset();
    //console.log({digest, encoding, input_is, input});
    return digest;
  }
}

export { canonicalize, SHA3, sha3json };
