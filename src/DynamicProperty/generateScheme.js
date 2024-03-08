import VueFormGenerator from 'vue-form-generator'


const generateSchema = (schemas, model) => {
    console.log('This is GenerateSchema Function', schemas);
    var tempSchema = schemas;
    var newSchema = [];
    tempSchema.forEach(p => {

        if(p.type == "input" && p.groupLegendName == ""){
        
           var schema = {
                type:(p.isComboBox)? "inputDropdown": "input",
                inputType:(p.inputType) =="text" ? "text": "number",
                model : p.model,
                label : p.label,
                min: p.min,
                step:(p.inputType) =="text" ? "": "any",
                maxlength: p.max,
                help: p.help,
                featured: p.featured,
                inputSelectId: p.comboBoxId,
                default: p.default?p.useStdDefault:((p.inputType) =="number" ? 0: ""),
                //if inputDropdown
                values: p.values,
                validator:(p.inputType) =="text" ? VueFormGenerator.validators.string:VueFormGenerator.validators.number,
               // readonly: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
               disabled: (!p.readonly)? p.readonly:( (p.readOnlyCondition == "") ? p.readonly:function(model){

                    var readOnlyCondition = (p.readOnlyCondition).trim();
                    if(readOnlyCondition != ''){
                        if (readOnlyCondition.substring(0, 1) == '#' || readOnlyCondition.substring(0, 1) == '(') {
                            var FieldData = returnFormula(readOnlyCondition,model).split('^');
                            readOnlyCondition = FieldData[1];
                           // console.log(readOnlyCondition);
                            
                            switch(p.readOnlyOperator.trim()){
                                case "=" :  return model && ((readOnlyCondition) == p.readOnlyCompareValue.trim());
                                            break;
                                case "<" :  return model && (readOnlyCondition) < p.readOnlyCompareValue.trim();
                                            break;
                                case ">" :  return model && (readOnlyCondition) > p.readOnlyCompareValue.trim();
                                            break;
                                case "<=" :  return model && (readOnlyCondition ) <= p.readOnlyCompareValue.trim();
                                             break;
                                case ">=" :  return model && (readOnlyCondition) >= p.readOnlyCompareValue.trim();
                                             break;
                                case "<>" :  return model && (readOnlyCondition ) != p.readOnlyCompareValue.trim();
                                             break;
                             } 
                            
                         } 
                    }
               }),
                // required: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
               required: (!p.required)?p.required:( p.requiredCondtion == ""? p.required:false),
               visible:(!p.visible)?!p.visible:( p.visibleCondition == ""? !p.visible:function(model){
                var visibleCondition = (p.visibleCondition).trim();
                if(visibleCondition != ''){
                    if (visibleCondition.substring(0, 1) == '#' || visibleCondition.substring(0, 1) == '(') {
                        var FieldData = returnFormula(visibleCondition,model).split('^');
                        visibleCondition = FieldData[1];
                       // console.log(visibleCondition);
                        
                       switch(p.visiableOperator.trim()){
                        case "=" : if( model && (visibleCondition) == p.visialbeCompareValue.trim()){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                   } else{ return true;}
                                    break;
                        case "<" :  if( model && (visibleCondition ) < p.visialbeCompareValue.trim()){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                    break;
                        case ">" : if( model && (visibleCondition) > p.visialbeCompareValue.trim()){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                    break;
                        case "<=" :  if( model && (visibleCondition) <= p.visialbeCompareValue.trim()){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                        break;
                        case ">=" :  if( model && (visibleCondition)>= p.visialbeCompareValue.trim()){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                     break;
                        case "<>" :  if( model && (visibleCondition)!= p.visialbeCompareValue.trim()){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                        break;
                        }
                        
                     } 
                }
              }),

            }
            newSchema.push(schema);
        }
        if(p.type == "select" && p.groupLegendName == ""){

            var schema = {
                type :"select",
                model: p.model,
                label : p.label,
                values : p.values,
                help:  p.help,
                featured: p.featured,
                default: p.default?p.useStdDefault:"",
                validator:  VueFormGenerator.validators.required,
                disabled: (!p.readonly)? p.readonly:( (p.readOnlyCondition == "") ? p.readonly:function(model){
                    var readOnlyCondition = (p.readOnlyCondition).trim();
                    if(readOnlyCondition != ''){
                        if (readOnlyCondition.substring(0, 1) == '#' || readOnlyCondition.substring(0, 1) == '(') {
                            var FieldData = returnFormula(readOnlyCondition,model).split('^');
                            readOnlyCondition = FieldData[1];
                           // console.log(readOnlyCondition);
                            
                            switch(p.readOnlyOperator.trim()){
                                case "=" :  return model && ((readOnlyCondition) == p.readOnlyCompareValue.trim());
                                            break;
                                case "<" :  return model && (readOnlyCondition) < p.readOnlyCompareValue.trim();
                                            break;
                                case ">" :  return model && (readOnlyCondition) > p.readOnlyCompareValue.trim();
                                            break;
                                case "<=" :  return model && (readOnlyCondition ) <= p.readOnlyCompareValue.trim();
                                             break;
                                case ">=" :  return model && (readOnlyCondition) >= p.readOnlyCompareValue.trim();
                                             break;
                                case "<>" :  return model && (readOnlyCondition ) != p.readOnlyCompareValue.trim();
                                             break;
                             } 
                            
                         } 
                    }
                }),
                // required: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
                required: (!p.required)?p.required:( p.requiredCondtion == ""? p.required:false),
                visible:(!p.visible)?!p.visible:( p.visibleCondition == ""? !p.visible:function(model){
                    var visibleCondition = (p.visibleCondition).trim();
                    if(visibleCondition != ''){
                        if (visibleCondition.substring(0, 1) == '#' || visibleCondition.substring(0, 1) == '(') {
                            var FieldData = returnFormula(visibleCondition,model).split('^');
                            visibleCondition = FieldData[1];
                           // console.log(visibleCondition);
                            
                           switch(p.visiableOperator.trim()){
                            case "=" : if( model && (visibleCondition) == p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                       } else{ return true;}
                                        break;
                            case "<" :  if( model && (visibleCondition ) < p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                        break;
                            case ">" : if( model && (visibleCondition) > p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                        break;
                            case "<=" :  if( model && (visibleCondition) <= p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                            break;
                            case ">=" :  if( model && (visibleCondition)>= p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                         break;
                            case "<>" :  if( model && (visibleCondition)!= p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                            break;
                            }
                            
                         } 
                    }
                }),
            }
            newSchema.push(schema);
        }
        if(p.type == "date"){

            var schema ={
                type: "cleave",
                model : p.model,
                label : p.label,
                min: p.min,
                help: p.help,
                placeholder: 'dd/mm/yyyy',
                featured: p.featured,
                default: p.default?p.useStdDefault:((p.inputType) =="number" ? 0: ""),
                cleaveOptions: {
                    date: true,
                    datePattern: ['d', 'm', 'Y'],
                    delimiter: '/',
                },
                validator: VueFormGenerator.validators.date,
                // readonly: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
                disabled: (!p.readonly)? p.readonly:( (p.readOnlyCondition == "") ? p.readonly:function(model){
                    var readOnlyCondition = (p.readOnlyCondition).trim();
                    if(readOnlyCondition != ''){
                        if (readOnlyCondition.substring(0, 1) == '#' || readOnlyCondition.substring(0, 1) == '(') {
                            var FieldData = returnFormula(readOnlyCondition,model).split('^');
                            readOnlyCondition = FieldData[1];
                           // console.log(readOnlyCondition);
                            
                            switch(p.readOnlyOperator.trim()){
                                case "=" :  return model && ((readOnlyCondition) == p.readOnlyCompareValue.trim());
                                            break;
                                case "<" :  return model && (readOnlyCondition) < p.readOnlyCompareValue.trim();
                                            break;
                                case ">" :  return model && (readOnlyCondition) > p.readOnlyCompareValue.trim();
                                            break;
                                case "<=" :  return model && (readOnlyCondition ) <= p.readOnlyCompareValue.trim();
                                             break;
                                case ">=" :  return model && (readOnlyCondition) >= p.readOnlyCompareValue.trim();
                                             break;
                                case "<>" :  return model && (readOnlyCondition ) != p.readOnlyCompareValue.trim();
                                             break;
                             } 
                            
                         } 
                    }
                }),
                // required: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
                required: (!p.required)?p.required:( p.requiredCondtion == ""? p.required:false),
                visible:(!p.visible)?!p.visible:( p.visibleCondition == ""? !p.visible:function(model){
                    var visibleCondition = (p.visibleCondition).trim();
                    if(visibleCondition != ''){
                        if (visibleCondition.substring(0, 1) == '#' || visibleCondition.substring(0, 1) == '(') {
                            var FieldData = returnFormula(visibleCondition,model).split('^');
                            visibleCondition = FieldData[1];
                           // console.log(visibleCondition);
                            
                           switch(p.visiableOperator.trim()){
                            case "=" : if( model && (visibleCondition) == p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                       } else{ return true;}
                                        break;
                            case "<" :  if( model && (visibleCondition ) < p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                        break;
                            case ">" : if( model && (visibleCondition) > p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                        break;
                            case "<=" :  if( model && (visibleCondition) <= p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                            break;
                            case ">=" :  if( model && (visibleCondition)>= p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                         break;
                            case "<>" :  if( model && (visibleCondition)!= p.visialbeCompareValue.trim()){
                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                            return false;
                                         }else{ return true;}
                                            break;
                            }
                            
                         } 
                    }
                })
            }
            newSchema.push(schema);
        }


    });

    // console.log('Schemeaaa='+JSON.stringify(newSchema));
  
 return  newSchema;
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

export default generateSchema;