import convertDate from "@/DynamicProperty/dateFormat.js";

const convertDateWithSchema = (schema, model, isDBConvert) => {
  if (schema.length > 0) {
    schema.forEach((element) => {
      if (element.type == "date") {
        model[element.model] = convertDate(model[element.model], isDBConvert);
      } else if (element.inputType == "number") {
        model[element.model] = model[element.model] ? model[element.model] : 0;
      }
    });
  }
};

export default convertDateWithSchema;
