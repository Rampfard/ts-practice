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

export interface Settings extends Defaults {
	useVedic?: boolean;
	increment?: number;
	groups?: RegExp;
}

export type NumberFn = (v: number, i?: number) => number;

export default class Currency {
	readonly value: number | string | Currency;
	readonly opts: Settings;
	private _settings: Settings;
	private _precision: number;

	constructor(value: number | string | Currency, opts?: Settings) {
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
