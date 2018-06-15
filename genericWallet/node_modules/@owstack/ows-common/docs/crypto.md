# Crypto
The cryptographic primitives implementations in this package have been reviewed by the Open Wallet Stack engineering team. More audits and reviews are welcomed.

## Random
The `owsCommon.crypto.Random` namespace contains a single function, named `getRandomBuffer(size)` that returns a `Buffer` instance with random bytes. It may not work depending on the engine that the OWS *-node is running on (doesn't work with IE versions lesser than 11).

## BN
The `owsCommon.crypto.BN` class contains a wrapper around [bn.js](https://github.com/indutny/bn.js), the bignum library used internally in by OWS libraries.

## Hash
The `owsCommon.crypto.Hash` namespace contains a set of hashes and utilities. These are either the native `crypto` hash functions from `node.js` or their respective browser shims as provided by the `browserify` library.
