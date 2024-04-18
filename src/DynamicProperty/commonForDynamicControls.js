const returnFormula = (Formulas, model) => {
  var separators = [" ", "\\+", "-", "\\(", "\\)", "\\*", "/", ":", "\\?"];
  var tokens = Formulas.split(new RegExp(separators.join("|"), "g"));
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
      Formulas = Formulas.replace(
        tokens[i],
        "parseFloat(" + model[fieldProperty] + ")"
      );
    }
  }
  if (FieldCtrls != "") {
    FieldCtrls = FieldCtrls.substring(0, FieldCtrls.length - 1);
    return FieldCtrls + "^" + Formulas;
  }
};

export default returnFormula;
