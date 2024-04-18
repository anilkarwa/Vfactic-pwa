import VueFormGenerator from "vue-form-generator";
import ConvertNumber2Word from "@/DynamicProperty/NumberToWords.js";
import httpClient from "@/services/httpClient.js";

const updateModalAfterChange = (
  schemas,
  headerModal,
  detailModal,
  footerModal,
  totalModal,
  detailSectionData,
  section,
  selectedParty,
  callQueries
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
          var FieldData = returnFormula(
            Formula,
            headerModal,
            detailModal,
            footerModal,
            totalModal
          ).split("^");
          Formula = FieldData[1];
          //alert(Formula);
          //alert(JSON.stringify(FieldData));
          var ouput;
          try {
            ouput = eval(Formula);
          } catch (e) {
            ouput = 0;
          }
          if (section == "header") {
            headerModal[p.model] = parseFloat(ouput.toFixed(2));
          } else if (section == "detail") {
            detailModal[p.model] = parseFloat(ouput.toFixed(2));
          } else if (section == "footer") {
            footerModal[p.model] = parseFloat(ouput.toFixed(2));
          } else if (section == "total") {
            totalModal[p.model] = parseFloat(ouput.toFixed(2));
          }
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
              if (section == "header") {
                headerModal[p.model] = (AvgValue / k).toFixed(2);
              } else if (section == "detail") {
                detailModal[p.model] = (AvgValue / k).toFixed(2);
              } else if (section == "footer") {
                footerModal[p.model] = (AvgValue / k).toFixed(2);
              } else if (section == "total") {
                totalModal[p.model] = (AvgValue / k).toFixed(2);
              }
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
              if (section == "header") {
                headerModal[p.model] = TotalValue.toFixed(2);
              } else if (section == "detail") {
                detailModal[p.model] = TotalValue.toFixed(2);
              } else if (section == "footer") {
                footerModal[p.model] = TotalValue.toFixed(2);
              } else if (section == "total") {
                totalModal[p.model] = TotalValue.toFixed(2);
              }
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
              if (headerModal.hasOwnProperty(value.toUpperCase())) {
                amountInWords = ConvertNumber2Word(
                  headerModal[value.toUpperCase()],
                  0
                );
              } else if (detailModal.hasOwnProperty(value.toUpperCase())) {
                amountInWords = ConvertNumber2Word(
                  detailModal[value.toUpperCase()],
                  0
                );
              } else if (footerModal.hasOwnProperty(value.toUpperCase())) {
                amountInWords = ConvertNumber2Word(
                  footerModal[value.toUpperCase()],
                  0
                );
              } else if (totalModal.hasOwnProperty(value.toUpperCase())) {
                amountInWords = ConvertNumber2Word(
                  totalModal[value.toUpperCase()],
                  0
                );
                //console.log('amount ing words after='+amountInWords);
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
              if (section == "header") {
                headerModal[p.model] = output;
              } else if (section == "detail") {
                detailModal[p.model] = output;
              } else if (section == "footer") {
                footerModal[p.model] = output;
              } else if (section == "total") {
                totalModal[p.model] = output;
              }
            } catch (ex) {}
          } else if (formulaSplit[0].trim() == SVTROUND50) {
            Formula = Formula.replace(SVTROUND50, "").replace(/\s+/g, "");
            FieldData = returnFormula(
              Formula,
              headerModal,
              detailModal,
              footerModal,
              totalModal
            ).split("^");
            Formula = FieldData[1];
            if (section == "header") {
              headerModal[p.model] = parseFloat(
                Math.round(eval(Formula)).toFixed(2)
              );
            } else if (section == "detail") {
              detailModal[p.model] = parseFloat(
                Math.round(eval(Formula)).toFixed(2)
              );
            } else if (section == "footer") {
              footerModal[p.model] = parseFloat(
                Math.round(eval(Formula)).toFixed(2)
              );
            } else if (section == "total") {
              totalModal[p.model] = parseFloat(
                Math.round(eval(Formula)).toFixed(2)
              );
            }
          } else if (formulaSplit[0].trim() == SVTROUND100) {
            Formula = Formula.replace(SVTROUND100, "").replace(/\s+/g, "");
            FieldData = returnFormula(
              Formula,
              headerModal,
              detailModal,
              footerModal,
              totalModal
            ).split("^");
            Formula = FieldData[1];
            if (section == "header") {
              headerModal[p.model] = Math.ceil(eval(Formula)).toFixed(2);
            } else if (section == "detail") {
              detailModal[p.model] = Math.ceil(eval(Formula)).toFixed(2);
            } else if (section == "footer") {
              footerModal[p.model] = Math.ceil(eval(Formula)).toFixed(2);
            } else if (section == "total") {
              totalModal[p.model] = Math.ceil(eval(Formula)).toFixed(2);
            }
          } else if (formulaSplit[0].trim() == SVTROUND2) {
            Formula = Formula.replace(SVTROUND2, "").replace(/\s+/g, "");
            FieldData = returnFormula(
              Formula,
              headerModal,
              detailModal,
              footerModal,
              totalModal
            ).split("^");
            Formula = FieldData[1];
            if (section == "header") {
              headerModal[p.model] = parseFloat(eval(Formula).toFixed(2));
            } else if (section == "detail") {
              detailModal[p.model] = parseFloat(eval(Formula).toFixed(2));
            } else if (section == "footer") {
              footerModal[p.model] = parseFloat(eval(Formula).toFixed(2));
            } else if (section == "total") {
              totalModal[p.model] = parseFloat(eval(Formula).toFixed(2));
            }
          } else if (formulaSplit[0].trim() == SVTROUNDOFFAMT) {
            Formula = Formula.replace(SVTROUNDOFFAMT, "").replace(/\s+/g, "");
            FieldData = returnFormula(
              Formula,
              headerModal,
              detailModal,
              footerModal,
              totalModal
            ).split("^");
            Formula = FieldData[1];
            var roundOffAmt =
              eval(Formula).toFixed(0) - eval(Formula).toFixed(2);
            if (section == "header") {
              headerModal[p.model] = parseFloat(roundOffAmt.toFixed(2));
            } else if (section == "detail") {
              detailModal[p.model] = parseFloat(roundOffAmt.toFixed(2));
            } else if (section == "footer") {
              footerModal[p.model] = parseFloat(roundOffAmt.toFixed(2));
            } else if (section == "total") {
              totalModal[p.model] = parseFloat(roundOffAmt.toFixed(2));
            }
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
            if (section == "header") {
              headerModal[p.model] = parseFloat(TotalValue.toFixed(2));
            } else if (section == "detail") {
              detailModal[p.model] = parseFloat(TotalValue.toFixed(2));
            } else if (section == "footer") {
              footerModal[p.model] = parseFloat(TotalValue.toFixed(2));
            } else if (section == "total") {
              totalModal[p.model] = parseFloat(TotalValue.toFixed(2));
            }
          } else if (formulaSplit[0].toString() == "SVTCURDATE") {
            if (section == "header") {
              headerModal[p.model] = "" + getCurrentDate();
            } else if (section == "detail") {
              detailModal[p.model] = "" + getCurrentDate();
            } else if (section == "footer") {
              footerModal[p.model] = "" + getCurrentDate();
            } else if (section == "total") {
              totalModal[p.model] = "" + getCurrentDate();
            }
          } else if (formulaSplit[0].toString() == "SVTCURTIME") {
            if (section == "header") {
              headerModal[p.model] = "" + getTimeZone();
            } else if (section == "detail") {
              detailModal[p.model] = "" + getTimeZone();
            } else if (section == "footer") {
              footerModal[p.model] = "" + getTimeZone();
            } else if (section == "total") {
              totalModal[p.model] = "" + getTimeZone();
            }
          } else if (formulaSplit[0].toString() == "SVTFYF") {
            if (section == "header") {
              headerModal[p.model] = "" + getFinYears(1);
            } else if (section == "detail") {
              detailModal[p.model] = "" + getFinYears(1);
            } else if (section == "footer") {
              footerModal[p.model] = "" + getFinYears(1);
            } else if (section == "total") {
              totalModal[p.model] = "" + getFinYears(1);
            }
          } else if (formulaSplit[0].toString() == "SVTFYT") {
            if (section == "header") {
              headerModal[p.model] = "" + getFinYears(2);
            } else if (section == "detail") {
              detailModal[p.model] = "" + getFinYears(2);
            } else if (section == "footer") {
              footerModal[p.model] = "" + getFinYears(2);
            } else if (section == "total") {
              totalModal[p.model] = "" + getFinYears(2);
            }
          }
        }
      }

      //check for dropdown and add 0 as default option
      if (p.type == "select") {
        if (section == "header" && headerModal[p.model] == "") {
          headerModal[p.model] = "0";
        } else if (section == "detail" && detailModal[p.model] == "") {
          detailModal[p.model] = "0";
        } else if (section == "footer" && footerModal[p.model] == "") {
          footerModal[p.model] = "0";
        } else if (section == "total" && totalModal[p.model] == "") {
          totalModal[p.model] = "0";
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
        if (section == "header") {
          modelData = headerModal[p.model];
        } else if (section == "detail") {
          modelData = detailModal[p.model];
        } else if (section == "footer") {
          modelData = footerModal[p.model];
        } else if (section == "total") {
          modelData = totalModal[p.model];
        }

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
              if (section == "header") {
                headerModal[p.model] = result.data.fieldValue;
              } else if (section == "detail") {
                detailModal[p.model] = result.data.fieldValue;
              } else if (section == "footer") {
                footerModal[p.model] = result.data.fieldValue;
              } else if (section == "total") {
                totalModal[p.model] = result.data.fieldValue;
              }
              console.log("load from query" + result.data.fieldValue);
            })
            .catch((err) => {
              console.log("error gettting data from load field by query");
            });
        }
      }
      if (p.pickUpQuery != "" && p.pickUpAfterField != "#SVTPARTY#") {
        let pickUpField = "";
        let query = p.pickUpQuery;

        if (headerModal.hasOwnProperty(p.pickUpAfterField)) {
          pickUpField = headerModal[p.pickUpAfterField];
        } else if (detailModal.hasOwnProperty(p.pickUpAfterField)) {
          pickUpField = detailModal[p.pickUpAfterField];
        } else if (footerModal.hasOwnProperty(p.pickUpAfterField)) {
          pickUpField = footerModal[p.pickUpAfterField];
        } else if (totalModal.hasOwnProperty(p.pickUpAfterField)) {
          pickUpField = totalModal[p.pickUpAfterField];
        }

        //replace value in query
        //replace value in query
        let myRegExp = new RegExp("#" + p.pickUpAfterField + "#", "ig");
        /*if(p.pickUpAfterField == "#SVTPARTY#" || p.pickUpAfterField == "SVTPARTY"){
                    myRegExp = new RegExp(p.pickUpAfterField,'ig');
                }else{
                    myRegExp = new RegExp('#'+p.pickUpAfterField+'#','ig');
                }*/
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
              if (headerModal.hasOwnProperty(p.model)) {
                headerModal[p.model] = result.data.fieldValue;
              } else if (detailModal.hasOwnProperty(p.model)) {
                detailModal[p.model] = result.data.fieldValue;
              } else if (footerModal.hasOwnProperty(p.model)) {
                footerModal[p.model] = result.data.fieldValue;
              } else if (totalModal.hasOwnProperty(p.model)) {
                totalModal[p.model] = result.data.fieldValue;
              }
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
function returnFormula(
  Formulas,
  headerModal,
  detailModal,
  footerModal,
  totalModal
) {
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
      if (headerModal.hasOwnProperty(fieldProperty)) {
        //console.log('has property='+fieldProperty);
        Formulas = Formulas.replace(tokens[i], headerModal[fieldProperty]);
      } else if (detailModal.hasOwnProperty(fieldProperty)) {
        //console.log('has property='+fieldProperty);
        Formulas = Formulas.replace(tokens[i], detailModal[fieldProperty]);
      } else if (footerModal.hasOwnProperty(fieldProperty)) {
        Formulas = Formulas.replace(tokens[i], footerModal[fieldProperty]);
      } else if (totalModal.hasOwnProperty(fieldProperty)) {
        Formulas = Formulas.replace(tokens[i], totalModal[fieldProperty]);
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

export default updateModalAfterChange;
