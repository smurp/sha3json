import {default as tap} from 'tap';
import {sha3json} from '../index.js';

//  https://www.di-mgt.com.au/sha_testvectors.html
const abc224hash = 'e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf';
tap.equal(sha3json(224,'hex')('abc'), abc224hash, "512 hex -- 'abc'");

var hashjson = sha3json(224, 'base58');
const emptyArrayHash = '3SVNcPaZxjivxpAdUGwMuAB2gc1saEsc46L3GHh';
tap.equal(hashjson([]), emptyArrayHash);
tap.equal(hashjson(JSON.stringify([])), emptyArrayHash);

const emptyObjHash = '2YiAZGdUB54YnqaoVaLC2zz4YWFQiJ1EdEYRxDw';
tap.equal(hashjson({}), emptyObjHash);
tap.equal(hashjson(JSON.stringify({})), emptyObjHash);

