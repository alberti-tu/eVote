'use strict';

const crypto = require('crypto');

/**
 * 
 * @param {number|bigint} a 
 */
const abs = function (a) {
	a = BigInt(a);
	return (a > 0n) ? a : -a;
};

const gcd = function (a, b) {
	a = abs(a);
	b = abs(b);
	let shift = 0n;
	while (!((a | b) & 1n)) {
		a >>= 1n;
		b >>= 1n;
		shift++;
	}
	while (!(a & 1n)) a >>= 1n;
	do {
		while (!(b & 1n)) b >>= 1n;
		if (a > b) {
			let x = a;
			a = b;
			b = x;
		}
		b -= a;
	} while (b);

	// rescale
	return a << shift;
};

const lcm = function (a, b) {
	a = BigInt(a);
	b = BigInt(b);
	return abs(a * b) / gcd(a, b);
};

const toZn = function (a, n) {
	n = BigInt(n);
	a = BigInt(a) % n;
	return (a < 0) ? a + n : a;
};

// const modInv = function (a, p) {
// 	let u = p;
// 	let v = a;
// 	let r = 0n;
// 	let s = 1n;
// 	let k = 0n;
// 	while (v > 0n){
// 		 if (u % 2n === 0n) {
// 			 if (r%2n === 0n){
// 				 u = u/2n; r = r/2n; k = k + 1n;
// 			 }
// 			 else {
// 			 	 u = u/2n; r = (r + p)/2n; k = k + 1n;
// 			 }
// 		 }
// 		 else if (v % 2n === 0n) {
// 			 if (s % 2n === 0n) {
// 					v = v/2n; s = s/2n; k = k + 1n;
// 			 }
// 			 else {
// 			 		v = v/2n; s = (s + p)/2n; k = k + 1n;
// 			 }
// 		 }
// 		 else{
// 		 	 let x = (u - v);
// 			 if (x > 0){
// 				 u = x; r = r - s;
// 				 if (r < 0)
// 					 r = r + p;
// 			 }
// 			 else
// 				 v = -x; s = s - r;
// 				 if (s < 0)
// 					 s = s + p;
// 		 }
// 	}
// 	if (r>p)
// 	 	r = r - p;
// 	if (r < 0)
// 	 	r = r + p;
// 	return r;
// 	// n = abs(n);
// 	// a = toZn(a, n);
// 	// for (let x = 1n; x < n; x++){
// 	// 	if ((a * x) % n == 1)
// 	// 		return x;
// 	// 	}
// };


const eGcd = function (a, b) {
	// Take positive integers a, b as input, and return a triple (g, x, y), such that ax + by = g = gcd(a, b).
	let x = 0n;
	let y = 1n;
	let u = 1n;
	let v = 0n;
	a = BigInt(a);
	b = BigInt(b);

	while (a !== 0n) {
		let q = b / a;
		let r = b % a;
		let m = x - (u * q);
		let n = y - (v * q);
		b = a;
		a = r;
		x = u;
		y = v;
		u = m;
		v = n;
	}
	return {
		b: b,
		x: x,
		y: y
	}
};

const modInv = function (a, n) {
	let egcd = eGcd(a, n);
	if (egcd.b !== 1n) {
		return null; // modular inverse does not exist
	} else {
		return toZn(egcd.x, n);
	}
};

const modPow = function (a, b, n) {
	// See Knuth, volume 2, section 4.6.3.
	n = BigInt(n);
	a = toZn(a, n);
	b = BigInt(b);
	if ( b < 0n) {
		return modInv(modPow(a, abs(b), n), n);
	}
	let result = 1n;
	let x = a;
	while (b > 0) {
		var leastSignificantBit = b % 2n;
		b = b / 2n;
		if (leastSignificantBit == 1n) {
			result = result * x;
			result = result % n;
		}
		x = x * x;
		x = x % n;
	}
	return result;
};

module.exports = {
    abs: abs,
    gcd: gcd,
	lcm: lcm,
	modInv: modInv,
	modPow: modPow,
    toZn:toZn

};