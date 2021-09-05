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
/* 
	Вот тут вопрос про огород из ? (необязательных свойств).
	Подумал что если мы хотим пердать в функцию свои настройки, допустим только разделитель(separator),
	то придётся писать ВСЕ настройки при передаче, даже те что остаются дефолтными, а их как видно дохрена,
	поэтому пометил всё как необязательное. Внутри библиотеки этот объект всё равно берётся из окружения.
	Передавать его не обязательно, а если разрешить передачу только Settings что описаны ниже,
	мы не сможем менять дефолтные и поэтому всё же стоит их оставить.
*/
export interface Settings extends Defaults {
	useVedic?: boolean;
	increment?: number;
	groups?: RegExp;
}

// Эта строчка в принципе не нужна, функции основанные на этом типе используются внутри библиотеки.
// Библиотека не будет смотреть на этот файл d.ts так что это просто лишний код. Сделал для лёгкой практики.
export type NumberFn = (v: number, i?: number) => number;

/* 
	Описал классом для удобства.
	Добавил readonly и private поля для того чтобы в тс файле их нельзя было изменить у объекта.
	Не совсем понял предполагалось ли библиотекой value менять напрямую,
	но методы add, multiply явно для его изменения внутри.
	Приватные для того чтобы их вообще нельзя было получить. Насколько мне известно,
	свойства что начинаются с _ предназначены для внутреннего использования, 
	логично что неплохо бы пометить как приватные.
	В JS такого не будет, но мы и весь код в TS пишем изначально.
 */
export default class Currency {
	readonly value: number | string | Currency;
	readonly opts: Settings;

	// Внутри фукнции currency defaults объект и setting сливаются в один _settings.
	// Логично что в settings все поля из defaults тоже присутствуют.
	// В методах как раз и передаётся _settings в currency. Поэтому ожидать на вход только Settings 
	// должно выдавать ошибку типа так как позже в currency внутри методов приходят settings (объединённые с deafults) 
	private _settings: Settings; 
	private _precision: number;

	constructor(value: number | string | Currency, opts?: Settings) {
		this.value = value;
		this.opts = opts;
	}

	add(number: number): Currency;

	subtract(number: number): Currency;

	multiply(number: number): Currency;

	// Вот тут не ясно, в jsdocs к библиотеке в return указано что возвращается массив Currency экземпляров.
	// Да и в консоле там масив из экземпляров Currency, поэтому возвращаемое значение указано как Currency[];
	divide(number: number): Currency[];

	distribute(count: number): Currency[];

	dollars(): number;

	cents(): number;

	format(useSymbol: boolean): string;

	toString(): string;

	// number в JSON. Зачем не понятно, логично же что тут ожидается операция JSON.stringify() которая вернёт строку.
	// Но автор указал что возвращается number. А именно this.value что и есть number.
	toJSON(): number;
}
