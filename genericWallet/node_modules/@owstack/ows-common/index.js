'use strict';

var owsCommon = module.exports;

// module information
owsCommon.version = 'v' + require('./package.json').version;

// crypto
owsCommon.crypto = {};
owsCommon.crypto.BN = require('./lib/crypto/bn');
owsCommon.crypto.Hash = require('./lib/crypto/hash');
owsCommon.crypto.Random = require('./lib/crypto/random');

// encoding
owsCommon.encoding = {};
owsCommon.encoding.Base58 = require('./lib/encoding/base58');
owsCommon.encoding.Base58Check = require('./lib/encoding/base58check');
owsCommon.encoding.BufferReader = require('./lib/encoding/bufferreader');
owsCommon.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
owsCommon.encoding.Varint = require('./lib/encoding/varint');

// utilities
owsCommon.util = {};
owsCommon.util.buffer = require('./lib/util/buffer');
owsCommon.util.js = require('./lib/util/js');
owsCommon.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
owsCommon.errors = require('./lib/errors');

// dependencies, subject to change
owsCommon.deps = {};
owsCommon.deps.bnjs = require('bn.js');
owsCommon.deps.bs58 = require('bs58');
owsCommon.deps.Buffer = Buffer;
owsCommon.deps._ = require('lodash');
