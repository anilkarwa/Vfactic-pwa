import generateSchema from "./generateScheme";


const customeValidaton = (shema,formSchema,formGroupSchema,model) =>{

    var tempSchema = shema;
    if(tempSchema.length >0){
    tempSchema.forEach(element => {
        let required = false;
       if(element.requiredCondtion !=""){
            var requiredconditionsOperand = element.requiredCondtion.split(" ");
            for(var i=0 ; i< requiredconditionsOperand.length;i++){
                requiredconditionsOperand[i] = removeHash(requiredconditionsOperand[i]);
            }            

            if(requiredconditionsOperand.length > 0)
            {
              required  = isRequired(model,requiredconditionsOperand,element.requiredOperator,element.requiredCompareValue);
            }
             
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

    if(conditionsOperand.length == 1){
        switch(operator){
            case "="  :  return model && ((model[conditionsOperand[0]] ) == compareValue);
                         break;
            case "<"  :  return model && (model[conditionsOperand[0]] ) < compareValue;
                         break;
            case ">"  :  return model && (model[conditionsOperand[0]] ) > compareValue;
                         break;
            case "<=" :  return model && (model[conditionsOperand[0]] ) <= compareValue;
                         break;
            case ">=" :  return model && (model[conditionsOperand[0]] ) >= compareValue;
                         break;
            case "<>" :  return model && (model[conditionsOperand[0]] ) != compareValuee;
                         break;
         }
    }

}

export default customeValidaton;