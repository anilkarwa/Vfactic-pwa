

const customeValidaton = (shema,formSchema,formGroupSchema,model) =>{

    var tempSchema = shema;
    if(tempSchema.length >0){
    tempSchema.forEach(element => {
        let required = false;
       if(element.requiredCondtion !=""){

              required  = isRequired(model,element.requiredCondtion,element.requiredOperator,element.requiredCompareValue);
             
            formSchema.forEach(e=> {
                if(e.model == element.model)
                {
                    e.required = required;
                }
            });
            formGroupSchema.forEach(gs =>{
                gs.fields.forEach(f =>{
                    if(f.model == element.model ){
                        f.required = required;
                    }
                });
            });
       }       
   });
}
 }

 function removeHash(value){
    return (value.replace('#','').replace('#',''));
}

function isRequired(model,conditionsOperand,operator, compareValue){

    var requiredCondition = (conditionsOperand).trim();
    if(requiredCondition != ''){
        if (requiredCondition.substring(0, 1) == '#' || requiredCondition.substring(0, 1) == '(') {
            var FieldData = returnFormula(requiredCondition,model).split('^');
            requiredCondition = FieldData[1];
           // console.log(requiredCondition);

        switch(operator.trim()){
            case "="  :  return model && ((requiredCondition) == compareValue.trim());
                         break;
            case "<"  :  return model && (requiredCondition) < compareValue.trim();
                         break;
            case ">"  :  return model && (requiredCondition) > compareValue.trim();
                         break;
            case "<=" :  return model && (requiredCondition) <= compareValue.trim();
                         break;
            case ">=" :  return model && (requiredCondition) >= compareValue.trim();
                         break;
            case "<>" :  return model && (requiredCondition) != compareValuee.trim();
                         break;
         }
    }
  }

}

//Get Cal culation formulas
function returnFormula(Formulas,model) {
    var separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
    var tokens = Formulas.trim().split(new RegExp(separators.join('|'), 'g'));
    var FieldCtrls = '';
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i] != "" && tokens[i].substring(0, 1) == '#') {
            FieldCtrls = FieldCtrls + tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase() + ',';
            let fieldProperty =tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase();
            if(model.hasOwnProperty(fieldProperty)){
                Formulas = Formulas.replace(tokens[i], model[fieldProperty]);
            }
        }
    }
    if (FieldCtrls != '') {
        FieldCtrls = FieldCtrls.substring(0, FieldCtrls.length - 1);
        return FieldCtrls + '^' + Formulas;
    }
}

export default customeValidaton;