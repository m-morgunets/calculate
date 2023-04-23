function calculator(string) {
  // Объект римский чисел и соотвествующих им арабских
	let romanNumerals = {
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};

  // Функция преобразования из римской в арабскую систему счисления
	function romanToArabic(num) {
		let arabic = 0;
		num.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
			arabic += romanNumerals[i];
		});
		return arabic;
	}

  // Функция преобразования из арабской в римскую систему счисления
	function arabicToRoman(num) {
		let roman = '';
		for (const key in romanNumerals) {
			while (num >= romanNumerals[key]) {
				roman += key;
				num -= romanNumerals[key];
			}
		}
		return roman;
	}

  // Функция с проверкой, что числа входят в доступный диапатоз от 1 до 10 включительно
	function checkNum(a, b) {
		if (a <= 0 || a > 10 || b <= 0 || b > 10) {
			throw new Error(`Ошибка! Превышен интервал доступный оператору`);
		}
	}

  // Объект с функциоями математических операций
	let mathOperation = {
		'+': (a, b) => {
			return a + b;
		},
		'-': (a, b) => {
			return a - b;
		},
		'*': (a, b) => {
			return a * b;
		},
		'/': (a, b) => {
			return Math.trunc(a / b);
		}
	};

	let arr = string.split(' '); // Преобразовываем строку в массив
  // Проверка, что массив имеет 3 элемента
	if (arr.length > 3 || arr.length < 3) {
		throw new Error(`Ошибка! Преывшено кол-во операторов`);
	}

  // Первое условие срабатывает если оба эелемента являются арабскими числами
	if (!isNaN(arr[0]) && !isNaN(arr[2])) {
	  let firstOperand = Number(arr[0]); // Преобразовываем первое число из типа String в Number
	  let secondOperand = Number(arr[2]); // Преобразовываем второе число из типа String в Number
    
		checkNum(firstOperand, secondOperand); // Функция проверки
		return String(mathOperation[arr[1]](firstOperand, secondOperand)); // Используя фукнцию из объекта mathOperation вычисляем результат
	} else if (isNaN(arr[0]) && isNaN(arr[2])) {
		let firstOperand = romanToArabic(arr[0]); // Преобразовываем первое число в арабскую систему счисления
		let secondOperand = romanToArabic(arr[2]); // Преобразовываем второе число в арабскую систему счисления

		checkNum(firstOperand, secondOperand); // Функция проверки
		let result = mathOperation[arr[1]](firstOperand, secondOperand); // Используя фукнцию из объекта mathOperation вычисляем результат
		return arabicToRoman(result); // Преобразовываем результат из арабской в римскую систему счисления
	} else {
		throw new Error(`Ошибка! Различаются типы операторов`);
	}
}

console.log(calculator('1 + 3')); // 4
console.log(calculator('IV + VII')); // XI