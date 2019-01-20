'use strict';

const crypto = require('crypto');
const modArith = require('./modArith.js');

const randBetween = function(max, min=1) {
	let bitLen = bitLength(max);
	let byteLength = bitLen >> 3;
	let remaining = bitLen - (byteLength * 8);
	if (remaining > 0)
		byteLength++;
	
	let rnd;
	do {
		let buf = randBytes(byteLength, false);
		// remove extra bits
		if (remaining > 0)
			buf[0] = buf[0] & (2**remaining - 1);
		rnd = fromBuffer(buf);
	} while(rnd > max || rnd < min)
	return rnd;
};

/**
 * Miller-Rabin Probabilistic Primality Test. FIPS 186-4 C.3.1
 * 
 * @param {BigInt} w - an odd integer to be tested for primality;
 * @param {number} iterations - (default=41) The number of iterations of the test to be performed; the value shall be consistent with Table C.1, C.2 or C.3.
 * @param {boolean} sync - (default: false) If set to true the function is called in synchronous mode instead of returning a promise
 * 
 * @return {boolean} - Either true (probably prime) or false (definitely composite)
 */
const isProbablyPrime = function (w, iterations=41, sync=false) {
	if(sync)
		return isProbablyPrimeSync(w, iterations);
	else
		return new Promise(function(resolve) {
			resolve(isProbablyPrimeSync(w, iterations));
		});
};

const prime = function (bitLength, iterations=41, sync=false) {
	if(sync)
		return primeSync(bitLength, iterations);
	else
		return new Promise(function(resolve) {
			resolve(primeSync(bitLength, iterations));
		});
};

function fromBuffer(buf) {
	let ret = 0n;
	for (let i of buf.values()) {
		let bi = BigInt(i);
		ret = (ret << 8n) + bi;
	}
	return ret;
};

function bitLength(a) {
	let bits = 1;
	do {
		bits++;
	} while ((a >>= 1n) > 1n)
	return bits;
};

function randBytes(byteLength, forceLength=true) {
	let buf = Buffer.alloc(byteLength);
	crypto.randomFillSync(buf); //window.crypto     if...
	
	// If fixed length is required we put the first bit to 1 -> to get the necessary bitLength
	if(forceLength)
		buf[0] = buf[0] | 128;
	
	return buf;
};

/**
 * Miller-Rabin Probabilistic Primality Test. FIPS 186-4 C.3.1
 * 
 * @param {BigInt} w - an odd integer to be tested for primality;
 * @param {number} iterations - The number of iterations of the test to be performed; the value shall be consistent with Table C.1, C.2 or C.3.
 * 
 * @return {boolean} - Either true (probably prime) or false (definitely composite)
 */
function isProbablyPrimeSync(w, iterations) {
	/*
	PREFILTERING. Even values but 2 are not primes, so don't test. 
	1 is not a prime and the M-R algorithm needs w>1.
	*/
	if( w === 2n )
		return true;
	else if ( (w & 1n) === 0n || w === 1n)
		return false;

	
	/*
	1. Let a be the largest integer such that 2**a divides w−1.
	2. m = (w−1) / 2**a.
	3. wlen = len (w).
	4. For i = 1 to iterations do
		4.1 Obtain a string b of wlen bits from an RBG.
		Comment: Ensure that 1 < b < w−1.
		4.2 If ((b ≤ 1) or (b ≥ w−1)), then go to step 4.1.
		4.3 z = b**m mod w.
		4.4 If ((z = 1) or (z = w − 1)), then go to step 4.7.
		4.5 For j = 1 to a − 1 do.
		4.5.1 z = z**2 mod w.
		4.5.2 If (z = w−1), then go to step 4.7.
		4.5.3 If (z = 1), then go to step 4.6.
		4.6 Return COMPOSITE.
		4.7 Continue.
		Comment: Increment i for the do-loop in step 4.
	5. Return PROBABLY PRIME.
	*/
	let a = 0n, d = w - 1n;
	while (d % 2n === 0n) {
		d /= 2n;
		++a;
	}

	let m = (w - 1n) / (2n**a);

	loop: do {
		let b = randBetween(w - 1n, 2);
		let z = modArith.modPow(b, m, w);
		if (z === 1n || z === w - 1n)
			continue;
		
		for (let j = 1; j < a; j++) {
			z = modArith.modPow(z, 2n, w);
			if (z === w - 1n)
				continue loop;
			if (z === 1n)
				break;
		}
		return false;
	} while (--iterations);

	return true;
}

function primeSync(bitLength, iterations) {
	let rnd = 0n;
	do {
		rnd = fromBuffer(randBytes(bitLength / 8)) | 1n; // generate only odd numbers   //randbetween s^l-1/2, 2^l/2-1
	} while ( ! isProbablyPrime(rnd, iterations, true) )
	return rnd;
}

module.exports = {
    prime: prime,
    isProbablyPrime: isProbablyPrime,
    cryptoRandBetween: randBetween
};