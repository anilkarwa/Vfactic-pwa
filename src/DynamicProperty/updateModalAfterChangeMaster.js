import VueFormGenerator from "vue-form-generator";
import ConvertNumber2Word from "@/DynamicProperty/NumberToWords.js";

const updateModalAfterChangeMaster = (schemas, model) => {
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
          //  alert(Formula);
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

export default updateModalAfterChangeMaster;
