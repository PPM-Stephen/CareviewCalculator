//Set global variables
var amount, rate, hours, minutes, x, table;
var precison = 9;
var status = "good";
var times = 100;
var output = "";
var stats = "normal";

//Sets everything in motion when user enters amount or rate in the textboxes
function initiate()
{
	//Clear any previous output
	output = "";
	//Grab numbers from textboxes for amount and rate
	x = document.getElementById("inputAmount").value;
	y = document.getElementById("inputRate").value;
	//Set amdount and rate variables
	amount = x;
	rate = y;
	//Set 'time hours' from Calculation zone
	hours = Math.floor(amount/rate);
	//Set 'time minutes' from Calculation zone
	minutes = ((amount/rate - hours) * 60).toFixed(8);
	//Run the start funtion
	start();
	//Build table that contains results
	document.getElementById("mainOutput").innerHTML = '<table id="t01">' + table + '</table>';
}

//This is where most of the magic happens. This function creates the data in the table
function start()
{
	//Set table to nothing, set local variables
	table = '';
	var rows = 1;
	var cols = 1;
	var i;
	var ii = 0;
	//For loop that loops through creating the table
	for (var r = 0; r < rows; r++)
	{
		//Setting up the table, HTML being parsed to the 'table' string
		table += '<tr>';
		table += '<td class="title"> Time (Hours & Minutes) </td>';
		table += '<td class="title"> Rate of Interest </td>';
		//These items only appear if advanced mode
		if (stats == "nerd")
		{
			table += '<td class="title"> Time (Decimal) </td>';
			table += '<td class="title"> Calculated Rate </td>';
		}
		table += '<td class="title"> Amount Generated </td>';
		table += '</tr>';
		table += '<tr>';
		//Iterate though each matching calculation that careview will accept
		for (i = 0; i < times; i++) 
		{
			//Calling various functions to generate required data
			timeHours();
			timeMinutes();
			timeDecimal();
			calculatedRate();
			rateOfInterest();
			amountGenerated();
			//Checking if Careview will accept
			if (status == "good")
			{
				//'ii' allows to check if they are any matches, if there are the counter will go up if not, it will stay at 0
				ii += 1;
				//Loop that creates collumns in table with data
				for (var c = 1; c <= cols; c++)
				{
					table += '<td>' + timeHours() + ':' + timeMinutes() + '</td>';
					//These items only appear if advanced mode
					if (stats == "nerd")
					{
						table += '<td>' + timeDecimal() + '</td>';
						table += '<td>' + calculatedRate() + '</td>';
					}
					table += '<td>' + '$' + rateOfInterest() + '</td>';
					table += '<td>' + '$' + amountGenerated() + '</td>';
				}
			}
			//If Careview doesn't accept it, output nothing to the screen
			else
			{
				output += "";
			}
			//Increase minutes to advance to next minute (eg. 10:39 > 10:40)
			minutes++;
			table += '</tr>';
		}
	
	}
	//If there are no compatible matches that will work in Careview
	if (ii == 0)
	{
		output = "Sorry, there was no results matching the Amount and Rate. Please try checking the 'Show More Results' box.";
	}
}

//This function shows more matches when the user has ticked the checkbox
function showMore()
{
	var showMoreCheck = document.getElementById("showMoreCheck");
	if (showMoreCheck.checked == true)
	{
		//How many times to check
    	times = 1500
  	}
  	else
  	{
  		//How many times to check
    	times = 100
  	}
  	//Rerun the initate function to get up-to-date information to display
  	initiate();
}

//This function displays all detailed information, not required for normal function
function initiateNerdMode()
{
	var nerdModeCheck = document.getElementById("nerdModeCheck");
	if (nerdModeCheck.checked == true)
	{
		//Set the stats mode to 'nerd mode', basically all the details!
    	stats = "nerd";
    	//Shows Time and Precison Factor, these are only required for calculations
    	document.getElementById("extraStats").innerHTML = 'Total Time (HH:MM): ' + hours + ':' + minutes + ' | Precison Factor: ' + precison;
  	}
  	else
  	{
  		//Set the stats mode to 'normal mode' for basic operation
    	stats = "normal";
    	//Set the 'extraStats' element to white space when stats hidden
    	document.getElementById("extraStats").innerHTML = '&nbsp;';
  	}
  	//Rerun the initate function to get up-to-date information to display
  	initiate();
}

//This function calculates the time (hours) for user to use
function timeHours()
{
	//Check if minutes are equal to 60
	if (Math.ceil(minutes) == 60)
	{
		//Increase hours by 1 if minutes at 60
		hours = hours + 1;
		//This IF statement basically puts a '0' in front of any hours equal to or less than 9 to make them double digets
		if (hours <= 9)
		{
			return "0" + hours;
		}
		//If hours is 10 or above just return the hours
		else
		{
			return hours;
		}		
	}
	//If minutes aren't equal to 60
	else
	{
		//This IF statement basically puts a '0' in front of any hours equal to or less than 9 to make them double digets
		if (hours <= 9)
		{
			return "0" + hours;
		}
		//If hours is 10 or above just return the hours
		else
		{
			return hours;
		}
	}
}

//This function calculates the time (minutes) for user to use
function timeMinutes()
{
	//Check if minutes are equal to 60
	if (Math.ceil(minutes) == 60)
	{
		//Set minutes to 0 if minutes at 60 (New hour)
		minutes = 0;
		//This IF statement basically puts a '0' in front of any minutes equal to or less than 9 to make them double digets
		if (hours <= 9)
		{
			return "0" + minutes;
		}
		//If minutes is 10 or above just return the minutes
		else
		{
			return minutes;
		}
	}
	//If minutes aren't equal to 60
	else
	{
		//Round minutes up
		minutes = Math.ceil(minutes);
		//This IF statement basically puts a '0' in front of any minutes equal to or less than 9 to make them double diget
		if (minutes <= 9)
		{
			return "0" + minutes;
		}
		//If minutes is 10 or above just return the minutes
		else
		{
			return minutes;
		}
	}
}

//This function calculates the time in decimal form, returning number, rounded to 15 digets
function timeDecimal()
{
	var min = (hours + minutes / 60);
	return min.toFixed(15);
}

//This function calculates the rate in decimal form
function calculatedRate()
{
	var calcRate = amount / timeDecimal();
	return calcRate;
}

//This function calculates the rate for user to use
function rateOfInterest()
{
	//Nested IF statements basically breaking down BODMAS.
	var v1 = calculatedRate() - calculatedRate().toFixed(2);
	var v2, v3, v4;

	if (precison > 10)
	{
		v2 = 9.99999999;
	}
	else
	{
		if (precison < 0)
		{
			v2 = 0;
		}
		else
		{
			v2 = precison;
		}
	}

	v3 = 0.009 + 0.0001 * v2;

	//IF statement, if v1 is greater than v3 OR calculated rate is exactly calculated rate to two decimal places
	if (v1 > v3 || calculatedRate() == Math.floor(calculatedRate()).toFixed(2))
	{
		v4 = Math.ceil(calculatedRate().toFixed(2));
		//Status flag that says this works in careview
		status = "good";
		return v4;
	}
	else
	{
		//Status flag that says this doesn't work in careview
		status = "bad";
		return "N/A";
	}
}

//This function calculates the amount for user to use
function amountGenerated()
{
	//If rate of interest can't be calculated, return 'N/A'
	if (rateOfInterest() == "N/A")
	{
		return "N/A";
	}
	//Otherwise return amount that can be used with rate in Careview
	else
	{
		var a = rateOfInterest() * timeDecimal();
		return a;
	}
}