// tslint:disable-next-line: no-implicit-dependencies
import BN from 'bn.js';

export const WSURL = 'ws://127.0.0.1:9944';
export const DOT: BN = new BN('1000000000000000');
export const CREATION_FEE: BN = DOT.muln(500000);
export const GAS_REQUIRED = 1000000000000;
export const GAS_LIMIT = 0x00989680; // u32::1000000
export const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
export const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
export const CHARLIE = '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y';
