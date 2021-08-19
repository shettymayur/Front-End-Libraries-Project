$(document).ready(function() {
  console.clear();
  
  var entryVal = "0";
  var maxLength = 10;
  var maxHistoryLength = 20;
  var calcHistory = "";
  var shownHistory = "";
  
  (function addMouseEvents() {
    $("#zero").mousedown(function() {calcButtonDown("zero", true)});
    $("#zero").mouseup(function() {calcButtonDown("zero", false)});
    $("#decimal").mousedown(function() {calcButtonDown("decimal", true)});
    $("#decimal").mouseup(function() {calcButtonDown("decimal", false)});
    $("#total").mousedown(function() {calcButtonDown("total", true)});
    $("#total").mouseup(function() {calcButtonDown("total", false)});
    $("#one").mousedown(function() {calcButtonDown("one", true)});
    $("#one").mouseup(function() {calcButtonDown("one", false)});
    $("#two").mousedown(function() {calcButtonDown("two", true)});
    $("#two").mouseup(function() {calcButtonDown("two", false)});
    $("#three").mousedown(function() {calcButtonDown("three", true)});
    $("#three").mouseup(function() {calcButtonDown("three", false)});
    $("#add").mousedown(function() {calcButtonDown("add", true)});
    $("#add").mouseup(function() {calcButtonDown("add", false)});
    $("#four").mousedown(function() {calcButtonDown("four", true)});
    $("#four").mouseup(function() {calcButtonDown("four", false)});
    $("#five").mousedown(function() {calcButtonDown("five", true)});
    $("#five").mouseup(function() {calcButtonDown("five", false)});
    $("#six").mousedown(function() {calcButtonDown("six", true)});
    $("#six").mouseup(function() {calcButtonDown("six", false)});
    $("#subtract").mousedown(function() {calcButtonDown("subtract", true)});
    $("#subtract").mouseup(function() {calcButtonDown("subtract", false)});
    $("#seven").mousedown(function() {calcButtonDown("seven", true)});
    $("#seven").mouseup(function() {calcButtonDown("seven", false)});
    $("#eight").mousedown(function() {calcButtonDown("eight", true)});
    $("#eight").mouseup(function() {calcButtonDown("eight", false)});
    $("#nine").mousedown(function() {calcButtonDown("nine", true)});
    $("#nine").mouseup(function() {calcButtonDown("nine", false)});
    $("#multiply").mousedown(function() {calcButtonDown("multiply", true)});
    $("#multiply").mouseup(function() {calcButtonDown("multiply", false)});
    $("#clearHistory").mousedown(function() {calcButtonDown("clearHistory", true)});  
    $("#clearHistory").mouseup(function() {calcButtonDown("clearHistory", false)});
    $("#clearEntry").mousedown(function() {calcButtonDown("clearEntry", true)});  
    $("#clearEntry").mouseup(function() {calcButtonDown("clearEntry", false)});
    $("#backspace").mousedown(function() {calcButtonDown("backspace", true)});  
    $("#backspace").mouseup(function() {calcButtonDown("backspace", false)});
    $("#divide").mousedown(function() {calcButtonDown("divide", true)});  
    $("#divide").mouseup(function() {calcButtonDown("divide", false)});
  })();
  (function addEntryEvents() {
    $("#zero").click(function() {updateCalcEntry("0")});
    $("#decimal").click(function() {updateCalcEntry(".")});
    $("#one").click(function() {updateCalcEntry("1")});
    $("#two").click(function() {updateCalcEntry("2")});
    $("#three").click(function() {updateCalcEntry("3")});
    $("#four").click(function() {updateCalcEntry("4")});
    $("#five").click(function() {updateCalcEntry("5")});
    $("#six").click(function() {updateCalcEntry("6")});
    $("#seven").click(function() {updateCalcEntry("7")});
    $("#eight").click(function() {updateCalcEntry("8")});
    $("#nine").click(function() {updateCalcEntry("9")});    
  })();
  (function addMathEvents() {
    $("#divide").click(function() {updateCalcHistory("/")});
    $("#multiply").click(function() {updateCalcHistory("*")});
    $("#subtract").click(function() {updateCalcHistory("-")});
    $("#add").click(function() {updateCalcHistory("+")});
  })();
  $("#clearEntry").click(function() {
    entryVal = "0";
    $("#calcEntry").html(entryVal);
  });
  $("#clearHistory").click(function() {
    entryVal = "0";
    $("#calcEntry").html(entryVal);
    calcHistory = "";
    $("#calcHistory").html("NO HISTORY");
  });
  $("#backspace").click(function() {
    if (entryVal.length == 1) {
      entryVal = "0";
    } else {
      entryVal = entryVal.slice(0, -1);
    }    
    $("#calcEntry").html(entryVal);
  });
  $("#total").click(function() {
    if (entryVal.length > 0 && entryVal !== "0") {
      calcHistory = "(" + calcHistory + entryVal + ")";
    }
    if (calcHistory.length > 0) {
      var lastChar = calcHistory.slice(-1);
      if ($.inArray(lastChar, mathFuncs) > 0) {
        calcHistory = calcHistory.slice(0, -1);
      }
      if (calcHistory.length > maxHistoryLength) {
        shownHistory = "..." + calcHistory.slice(-(maxHistoryLength));
      } else {
        shownHistory = calcHistory;
      }
      $("#calcHistory").html(shownHistory);
      var total = eval(calcHistory).toString();
      if (total.length > maxLength) {
        total = total.substring(0, maxLength);
      }
      $("#calcEntry").html(total);
      entryVal = "0";
    }
  });
  
  function calcButtonDown(buttonName, addClass) {
    if (addClass) {
      $("#" + buttonName).addClass("calc-button-down");
    } else {
      $("#" + buttonName).removeClass("calc-button-down");
    }
  }
 
  function updateCalcEntry(val) {
    if (entryVal.length < maxLength) {
      if (entryVal == "0" && val == ".") {
        entryVal = "0.";
      } else if (entryVal == "0") {
        entryVal = val;
      } else if (val == "." && entryVal.indexOf(".") >= 0) {
        return;
      } else {
        entryVal += val;
      }       
    $("#calcEntry").html(entryVal);
    }
  }
  
  function updateCalcHistory(val) {
    var lastChar = calcHistory.slice(-1);
    if (entryVal.length > 0 && entryVal !== "0") {
      if ($.inArray(lastChar, mathFuncs) > -1) {
        calcHistory = calcHistory + entryVal + val;
      } else {
        calcHistory = entryVal + val;
      }
      entryVal = "0";
      $("calcEntry").html(entryVal);
    } else if (calcHistory.length > 0) {
      if ($.inArray(lastChar, mathFuncs) > -1) {
        calcHistory = calcHistory.slice(0, -1);
      }
      calcHistory = calcHistory + val;
    }
    if (calcHistory.length > maxHistoryLength) {
      shownHistory = "..." + calcHistory.slice(-(maxHistoryLength));
    } else {
      shownHistory = calcHistory;
    }
    $("#calcHistory").html(shownHistory);
  }
  
});

var mathFuncs = ["/", "*", "-", "+"];
