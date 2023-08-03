import {default as tap} from 'tap';
import {sha3json, canonicalize} from '../index.js';

//  https://www.di-mgt.com.au/sha_testvectors.html
const abc512hash = "b751850b1a57168a5693cd924b6b096e08f621827444f70d884f5d0240d2712e10e116e9192af3c91a7ec57647e3934057340b4cf408d5a56592f8274eec53f0";
tap.equal(sha3json(512,'hex')('abc'), abc512hash, "512 hex -- 'abc'");

var hashjson = sha3json(512, 'base64');
const emptyArrayHash = 'iIuFi3PV00/tqw8HZjQ2kxqVxz1teAjtyGh2e7kXL55UL7e7GtHb6YjO/wqv/eIBK8Dn0ZFOmGJp9G2TZRQ2pQ==';
tap.equal(hashjson([]), emptyArrayHash, "512 base64 -- []");
tap.equal(hashjson(JSON.stringify([])), emptyArrayHash, "512 base64 -- '[]'");

const emptyObjHash = 'wYAua5Zwkn6/3bf2ezgkZCI3Nh8H2zVSbELFVf/S2+dBVsNm4VUO+MBQimzHlkCacZSlm7pNMAphgrSD0xWoYg==';
tap.equal(hashjson({}), emptyObjHash, "512 base64 -- {}");
tap.equal(hashjson(JSON.stringify({})), emptyObjHash, "512 base64 -- '{}'");

tap.ok(hashjson({a:1, b:2}) == hashjson({b:2, a:1}),
       "hashes are canonicalized");
tap.ok(hashjson({a:1, b:2}) != hashjson('{"b":2, "a":1}'),
       "canonical JSON is sorted");

tap.ok(hashjson({a:1, b:2}) != hashjson('{"a":1, "b":2}'),
       "canonical JSON skips spaces" );

tap.equal('[{"a":1,"b":2}]', canonicalize([{b:2, a:1}]),
       "JSON is canonicalized recursively" );
