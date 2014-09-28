var height = document.bmiForm.height;
var weight = document.bmiForm.weight;
var bmi = document.bmiForm.bmi;
var heightUnitGauge = document.getElementById("heightUnitGauge");
var const_magic = 703.06957964

var height_m;
var weight_kg;

var backspace = 8;
var heightUnit = "m"; /* "m", "f" */
var weightUnit = "k"; /* "k", "p", stone? */

/*
 * height.unit
 */

/* var unit = { height: "m";
 * 		weight: "k";
 * 		}
 */

function lilRound(val) {
	return +( val ).toFixed(1);
}

function isNumber(n) {

	/* http://stackoverflow.com/a/1830844/2291720 */

	return !isNaN(parseFloat(n)) && isFinite(n);
}

function are2of3numbers(weight,height,bmi) {

	/* http://stackoverflow.com/a/3087026/2291720 */

	var a = isNumber(height)
		var b =	isNumber(weight)
		var c =	isNumber(bmi)

		return a ^ b ? c : a
}

function setMetric() {

	var feet = height.value.slice(0,1);
	var inches = height.value.slice(2).replace("'","") 

	inches += 12 * feet;
	height_m = inches * 2.54 / 100;
}


function getHeightSqr() {
	

	var heightSqr;
	
	/* make sure height is a number */
	if (isNumber(height.value)) {
		heightSqr = Math.pow(height.value/100,2);
	} else {
		heightSqr = NaN;
	}

	return heightSqr;
}

function setBmi() {

	var weightL = weight.value;
        var heightSqr = getHeightSqr();

	if (isNumber(heightSqr) && isNumber(weightL)) { 
		bmi.value = lilRound(weightL / heightSqr);
	}
}


function setWeight() {

        var heightSqr = getHeightSqr();
	var bmiL = bmi.value;

	if (isNumber(heightSqr) && isNumber(bmiL))
	{ 
		weight.value = lilRound(bmiL * heightSqr);
	}
}

function jumpToWeight(event) {
	if (isInchesDone()
		       && event.keyCode != backspace ) {
 		 setMetric();
		weight.focus();
	}
}

function guessHeightUnit(input) {

	switch (true) {
		case input <= 2.72: 
			return m;
		case input <= 9:
			return f;
		case input <= 272:
			return cm; 
	}
}

function isFirstDigitFeet(digit) {

	if (2 < digit && digit < 9 ) {
		return true;
	} else {
		return false;
	}

}

function setHeightUnit() {

	if (height.value.length == 1) {
		if ( isFirstDigitFeet(height.value) ) {
			heightUnit = "f";
		} else {
			heightUnit = "m";		
		}
	}
}




function setHeightUnitGauge() {

	if (heightUnit == "f") {
		heightUnitGauge.innerHTML = "feet";
	} else {
		heightUnitGauge.innerHTML = "cm";
	}
}


function isInchesDone() {
	
	var inches = height.value.replace("'","").substring(2);
	

	if ( (inches == "0") 
		|| ( 1 < inches && inches < 12 ) ){
		return true;
	} else {
		return false;
	}
}



function setHeightUnitEmbedded(event) {

	if (height.value.length == 1
		       	&& heightUnit == "f"
			&& event.keyCode != backspace) {
		height.value += '"';
	}
}

function setHeightSubUnitEmbedded(event) {

	if (heightUnit == "f"
		        && isInchesDone()
			&& event.keyCode != backspace ) {
		height.value += "'";
	}
}

function deleteTwo(event) {

	if (heightUnit == "f"
		&& event.keyCode == backspace
		&& height.value.length == '1') {
			height.value = "";
	}
	
}


function remSubUnit () {
	
	height.value = height.value.replace("'","");
	height.value = height.value.replace("cm","");
	height.value = height.value.replace("m","");
 	

}





