//Declare global variables

//Declare input data
var input_DesiredAmount;
var input_MaximumRate;

//Declare table data
var tableData;

//Declare time data
var timeHours = 0;
var timeMinutes = 0;

//Sets everything in motion when user enters amount or rate in the textboxes
function updatePage()
{
	//Grab numbers from textboxes for amount and rate
	input_DesiredAmount = parseFloat(document.getElementById("inputAmount").value);
	input_DesiredAmount = setDecimalPlaces(input_DesiredAmount, 2);
	document.getElementById("inputAmount").value = input_DesiredAmount;

	input_MaximumRate = parseFloat(document.getElementById("inputRate").value);
	input_MaximumRate = setDecimalPlaces(input_MaximumRate, 2);
	document.getElementById("inputRate").value = input_MaximumRate;

	//Run table generation

	//Build table that contains results
	document.getElementById("mainOutput").innerHTML = '<table id="t01">' + tableData + '</table>';
}

function setDecimalPlaces(number, decimalPlaces)
{
	var integerPortion = Math.floor(number);
	var decimalPortion = number - Math.floor(number);
	decimalPortion = Math.floor(decimalPortion * Math.pow(10, decimalPlaces));
	decimalPortion = decimalPortion / (Math.pow(10, decimalPlaces));
	
	return (integerPortion + decimalPortion);

}

