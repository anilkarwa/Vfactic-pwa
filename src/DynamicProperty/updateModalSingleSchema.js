import VueFormGenerator from "vue-form-generator";
import ConvertNumber2Word from "@/DynamicProperty/NumberToWords.js";
import httpClient from "@/services/httpClient.js";

const updateModalSingleSchema = (
  schemas,
  model,
  callQueries,
  selectedParty
) => {
  var tempSchema = schemas;

  if (tempSchema.length > 0) {
    tempSchema.forEach((p) => {
      if (p.formula != "") {
        var Formula = p.formula.trim();
        var SVTCOLSUM = "SVTCOLSUM",
          SVTCOLSUMGROUP = "SVTCOLSUMGROUP",
          SVTAMTINWORDS = "SVTAMTINWORDS",
          SVTROUND50 = "SVTROUND50",
          SVTROUND100 = "SVTROUND100",
          SVTROUND2 = "SVTROUND2";
        var SVTROUNDOFFAMT = "SVTROUNDOFFAMT",
          SVTCOLAVG = "SVTCOLAVG",
          SVTGETGRIDDATA = "SVTGETGRIDDATA";
        var formulaSplit = Formula.split("(");
        if (Formula.substring(0, 1) == "#" || Formula.substring(0, 1) == "(") {
          var FieldData = returnFormula(Formula, model).split("^");
          Formula = FieldData[1];
          //alert(Formula);
          //alert(JSON.stringify(FieldData));
          var ouput;
          try {
            ouput = eval(Formula);
          } catch (e) {
            ouput = 0;
          }

          model[p.model] = parseFloat(ouput.toFixed(2));
        } else {
          if (formulaSplit[0].toString().trim() == SVTCOLAVG) {
            try {
              var k = 0,
                AvgValue = 0;
              Formula = Formula.replace(SVTCOLAVG, "").replace(/\s+/g, "");
              Formula = Formula.substr(2); //Remove first character from string
              Formula = Formula.substr(0, Formula.length - 2); //Remove last character from string
              detailSectionData.forEach(function(value, i) {
                for (var key in value) {
                  if (key == Formula.toUpperCase()) {
                    AvgValue = AvgValue + parseFloat(value[key]);
                    k = k + 1;
                  }
                }
              });

              model[p.model] = (AvgValue / k).toFixed(2);
            } catch (ex) {}
          } else if (formulaSplit[0].toString().trim() == SVTCOLSUM) {
            try {
              var k = 0,
                TotalValue = 0;
              Formula = Formula.replace(SVTCOLSUM, "").replace(/\s+/g, "");
              Formula = Formula.substr(2); //Remove first character from string
              Formula = Formula.substr(0, Formula.length - 2); //Remove last character from string

              detailSectionData.forEach(function(value, i) {
                for (var key in value) {
                  if (key == Formula.toUpperCase()) {
                    TotalValue = TotalValue + parseFloat(value[key]);
                  }
                }
              });

              model[p.model] = TotalValue.toFixed(2);
            } catch (ex) {}
          } else if (formulaSplit[0].trim() == SVTAMTINWORDS) {
            try {
              var Type = 0;
              Formula = Formula.replace(SVTAMTINWORDS, "").replace(/\s+/g, "");
              Formula = Formula.replace("(", "");
              Formula = Formula.replace(")", "");
              var amtInWordsFrmla = Formula.split(",");
              var value = amtInWordsFrmla[0];
              var amountInWords = "";
              value = value.substr(0, value.length - 1);
              value = value.replace("#", "");
              if (model.hasOwnProperty(value.toUpperCase())) {
                amountInWords = ConvertNumber2Word(
                  model[value.toUpperCase()],
                  0
                );
              }

              var textStyle = amtInWordsFrmla[2];
              if (textStyle == undefined) {
                textStyle = "T";
              }
              var output = "";
              switch (textStyle) {
                case "U":
                  output =
                    "Rupee " + amountInWords + only.toString().toUpperCase();
                  break;
                case "L":
                  output =
                    "Rupee " + amountInWords + only.toString().toLowerCase();
                  break;
                case "T":
                  output =
                    "Rupee " +
                    amountInWords.toString().replace(/\w\S*/g, function(txt) {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    });
                  break;
                default:
                  output =
                    "Rupee " +
                    amountInWords.toString().replace(/\w\S*/g, function(txt) {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      );
                    });
                  break;
              }

              model[p.model] = output;
            } catch (ex) {}
          } else if (formulaSplit[0].trim() == SVTROUND50) {
            Formula = Formula.replace(SVTROUND50, "").replace(/\s+/g, "");
            FieldData = returnFormula(Formula, model).split("^");
            Formula = FieldData[1];

            model[p.model] = parseFloat(Math.round(eval(Formula)).toFixed(2));
          } else if (formulaSplit[0].trim() == SVTROUND100) {
            Formula = Formula.replace(SVTROUND100, "").replace(/\s+/g, "");
            FieldData = returnFormula(Formula, model).split("^");
            Formula = FieldData[1];

            model[p.model] = Math.ceil(eval(Formula)).toFixed(2);
          } else if (formulaSplit[0].trim() == SVTROUND2) {
            Formula = Formula.replace(SVTROUND2, "").replace(/\s+/g, "");
            FieldData = returnFormula(Formula, model).split("^");
            Formula = FieldData[1];

            model[p.model] = parseFloat(eval(Formula).toFixed(2));
          } else if (formulaSplit[0].trim() == SVTROUNDOFFAMT) {
            Formula = Formula.replace(SVTROUNDOFFAMT, "").replace(/\s+/g, "");
            FieldData = returnFormula(Formula, model).split("^");
            Formula = FieldData[1];
            var roundOffAmt =
              eval(Formula).toFixed(0) - eval(Formula).toFixed(2);

            model[p.model] = parseFloat(roundOffAmt.toFixed(2));
          } else if (formulaSplit[0].toString() == SVTCOLSUMGROUP) {
            var i = 0,
              TotalValue = 0;
            Formula = Formula.replace(SVTCOLSUMGROUP, "").replace(/\s+/g, "");
            Formula = Formula.substr(2); //Remove first character from string
            Formula = Formula.substr(0, Formula.length - 1); //Remove last character from string
            var formulaValues = Formula.split(",");
            var fldName = formulaValues[0]
              .toString()
              .substr(0, formulaValues[0].toString().length - 1);
            var fldValue = formulaValues[1]
              .toString()
              .substr(0, formulaValues[1].toString().length - 1);
            fldValue = fldValue.substr(1);
            detailSectionData.forEach(function(value, i) {
              var bln = false;
              for (var key in value) {
                if (
                  key == fldValue &&
                  value[key] == parseFloat(formulaValues[3])
                ) {
                  bln = true;
                }
                if (bln == true && key == fldName) {
                  TotalValue = TotalValue + parseFloat(value);
                }
              }
            });

            model[p.model] = parseFloat(TotalValue.toFixed(2));
          } else if (formulaSplit[0].toString() == "SVTCURDATE") {
            model[p.model] = "" + getCurrentDate();
          } else if (formulaSplit[0].toString() == "SVTCURTIME") {
            model[p.model] = "" + getTimeZone();
          } else if (formulaSplit[0].toString() == "SVTFYF") {
            model[p.model] =
              "" +
              getFinYears(
                1
              ); /*Financial year start year like 01/04/2014 returns 14*/
          } else if (formulaSplit[0].toString() == "SVTFYT") {
            model[p.model] =
              "" +
              getFinYears(
                2
              ); /*Financial year end year like 31/03/2015 returns 15*/
          }
        }
      }

      //check for dropdown and add 0 as default option
      if (p.type == "select") {
        if (model[p.model] == "") {
          model[p.model] = "0";
        }
      }

      //check load from query field data
      if (p.loadFromQuery != "" && callQueries) {
        let fieldName = p.loadFromQuery.split(".");
        let itemCode = "";
        let party = selectedParty;
        if (fieldName[0] == "i" || fieldName[0] == "g" || fieldName[0] == "u") {
          if (detailModal["ITEMCODE"] != "") {
            itemCode = detailModal["ITEMCODE"];
          } else {
            itemCode = "000";
          }
        }
        if (fieldName[0] == "s") {
          itemCode = "s";
        }
        if (fieldName[0] == "c") {
          itemCode = "c";
        }

        //reduce call if modal not empty
        let modelData = "";

        modelData = model[p.model];

        if (
          itemCode != "" &&
          itemCode != "000" &&
          itemCode &&
          party &&
          modelData == ""
        ) {
          httpClient({
            method: "GET",
            url: `${process.env.VUE_APP_API_BASE}loadDataFromQuery?fieldName=${
              p.loadFromQuery
            }&itemCode=${itemCode}&selectedParty=${party}`,
          })
            .then((result) => {
              model[p.model] = result.data.fieldValue;

              console.log("load from query" + result.data.fieldValue);
            })
            .catch((err) => {
              console.log("error gettting data from load field by query");
            });
        }
      }
      if (p.pickUpQuery != "") {
        let pickUpField = "";
        let query = p.pickUpQuery;
        pickUpField = model[p.pickUpAfterField];

        //replace value in query
        let myRegExp = new RegExp("#" + p.pickUpAfterField + "#", "ig");
        query = query.replace(myRegExp, pickUpField);
        query = query.replace(/\`/g, "'");
        console.log("pickup query= " + query);

        if (pickUpField != "") {
          httpClient({
            method: "GET",
            url: `${
              process.env.VUE_APP_API_BASE
            }loadDataFromQuery?&query=${query}`,
          })
            .then((result) => {
              model[p.model] = result.data.fieldValue;

              console.log("load from pickup query" + result.data.fieldValue);
            })
            .catch((err) => {
              console.log("error gettting data from load field by query");
            });
        }
      }
    });
  }
  return false;
};

function removeHash(value) {
  return value.replace("#", "").replace("#", "");
}

//Get Cal culation formulas
function returnFormula(Formulas, model) {
  var separators = [" ", "\\+", "-", "\\(", "\\)", "\\*", "/", ":", "\\?"];
  var tokens = Formulas.trim().split(new RegExp(separators.join("|"), "g"));
  var FieldCtrls = "";
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i] != "" && tokens[i].substring(0, 1) == "#") {
      FieldCtrls =
        FieldCtrls +
        tokens[i]
          .substring(0, tokens[i].length - 1)
          .replace("#", "")
          .toUpperCase() +
        ",";
      let fieldProperty = tokens[i]
        .substring(0, tokens[i].length - 1)
        .replace("#", "")
        .toUpperCase();
      if (model.hasOwnProperty(fieldProperty)) {
        //console.log('has property='+fieldProperty);
        Formulas = Formulas.replace(tokens[i], model[fieldProperty]);
      }
    }
  }
  if (FieldCtrls != "") {
    FieldCtrls = FieldCtrls.substring(0, FieldCtrls.length - 1);
    return FieldCtrls + "^" + Formulas;
  }
}

//Get System Current Date (dd MMM yyyy)
function getCurrentDate() {
  var current_date = new Date();
  var month_value = current_date.getMonth();
  var day_value = current_date.getDate();
  var year_value = current_date.getFullYear();
  return day_value + "/" + (month_value + 1) + "/" + year_value;
}

//get client time
function getTimeZone() {
  var localTime = new Date();
  var hours = localTime.getHours();
  var minutes = localTime.getMinutes();
  var seconds = localTime.getSeconds();
  return hours + "." + minutes + "." + seconds;
}

//get client system seconds from time
function getTimeStamp() {
  var localTime = new Date();
  return localTime;
}

//get client system seconds from time for auto save in cookies add seconds based on client settings
function getTimeStampForAutoSave() {
  var localTime = new Date();
  localTime.setSeconds(
    localTime.getSeconds() + parseInt($.session.get(Session_AutoSaveInSeconds))
  );
  return localTime;
}

/*Get Financila Year Start Year and End Year*/
function getFinYears(flag) {
  switch (flag) {
    case 1 /*Financial year start year like 01/04/2014 returns 14*/:
      var FromFinalYear = $.session.get(Session_FromYear).split("/");
      if (FromFinalYear.length > 0) {
        return FromFinalYear[2].slice(-2);
      } else {
        return "";
      }
      break;
    case 2 /*Financial year end year like 31/03/2015 returns 15*/:
      var ToFinalYear = $.session.get(Session_ToYear).split("/");
      if (ToFinalYear.length > 0) {
        return ToFinalYear[2].slice(-2);
      } else {
        return "";
      }
      break;
  }
}

export default updateModalSingleSchema;
