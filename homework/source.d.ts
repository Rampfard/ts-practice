export interface Defaults {
	symbol?: string;
	separator?: string;
	decimal?: string;
	formatWithSymbol?: boolean;
	errorOnInvalid?: boolean;
	precision?: number;
	pattern?: string;
	negativePattern?: string;
}

export type NumberFn = (v: number, i?: number) => number;

export default class Currency {
	value: number | string | Currency;
	opts: Defaults;

	constructor(value: number | string | Currency, opts?: Defaults) {
		this.value = value;
		this.opts = opts;
	}

	add(number: number): Currency;

	subtract(number: number): Currency;

	multiply(number: number): Currency;

	divide(number): Currency[];

	distribute(count: number): Currency[];

	dollars(): number;

	cents(): number;

	format(useSymbol: boolean): string;

	toString(): string;

	toJSON(): number;
}
