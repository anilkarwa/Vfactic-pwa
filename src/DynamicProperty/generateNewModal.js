const generateNewModal = (schemas, model) => {
  var tempSchema = schemas;
  var newModal = [];

  tempSchema.forEach((element) => {
    if (
      element.default == true ||
      element.inputType == "number" ||
      element.inputType == "numberList"
    ) {
      if (
        element.inputType == "number" ||
        (element.inputType == "numberList" &&
          (element.useStdDefault == "" || element.useStdDefault == null))
      ) {
        model[element.model] = 0;
      } else {
        if (
          element.inputType == "number" &&
          (element.useStdDefault != "" || element.useStdDefault != null)
        ) {
          model[element.model] = +element.useStdDefault;
        } else {
          model[element.model] = element.useStdDefault;
        }
      }
    }
  });
  return model;
};

export default generateNewModal;
