import VueFormGenerator from 'vue-form-generator'

const generateGroupSchema = (schemas, model) => {
    console.log('This is GenerateSchema Function', schemas);
    var tempSchema = schemas;
    var newSchema = [];
    
    tempSchema.forEach(p => {
        var groupSchema ={};
        var schema = {};
        //  var conditionsOperands = p.readOnlyCondition.replace('#','').replace('#','');
        var conditionsOperand = p.readOnlyCondition.split(" ");
        for(var i=0 ; i< conditionsOperand.length;i++){
            conditionsOperand[i] = removeHash(conditionsOperand[i]);
        }

        //  var conditionsOperands = p.readOnlyCondition.replace('#','').replace('#','');
        var requiredconditionsOperand = p.requiredCondtion.split(" ");
        for(var i=0 ; i< requiredconditionsOperand.length;i++){
            requiredconditionsOperand[i] = removeHash(requiredconditionsOperand[i]);
        }
         //  var conditionsOperands = p.readOnlyCondition.replace('#','').replace('#','');
         var hideconditionsOperand = p.visibleCondition.split(" ");
         for(var i=0 ; i< hideconditionsOperand.length;i++){
            hideconditionsOperand[i] = removeHash(hideconditionsOperand[i]);
         }
 
         groupSchema["legend"]= p.groupLegendName;

        if(p.type == "input" && p.groupLegendName != ""){
        
            schema = {
                type:(p.isComboBox)? "inputDropdown": "input",
                inputType: (p.inputType) =="text" ? "text": "number",
                model : p.model,
                label : p.label,
                min: p.min,
                max: p.max,
                help: p.help,
                featured: p.featured,
                inputSelectId: p.comboBoxId,
                default: p.default?p.useStdDefault:((p.inputType) =="number" ? 0: ""),
                //if inputDropdown
                values : p.values,
                validator: (p.inputType) =="text" ? VueFormGenerator.validators.string:VueFormGenerator.validators.number,
               // readonly: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
               disabled: (!p.readonly)? p.readonly:( (p.readOnlyCondition == "") ? p.readonly:(conditionsOperand.length == 1?function (model){ 
                   
                    switch(p.readOnlyOperator){
                        case "=" :  return model && ((model[conditionsOperand[0]] ) == p.readOnlyCompareValue);
                                    break;
                        case "<" :  return model && (model[conditionsOperand[0]] ) < p.readOnlyCompareValue;
                                    break;
                        case ">" :  return model && (model[conditionsOperand[0]] ) > p.readOnlyCompareValue;
                                    break;
                        case "<=" :  return model && (model[conditionsOperand[0]] ) <= p.readOnlyCompareValue;
                                     break;
                        case ">=" :  return model && (model[conditionsOperand[0]] ) >= p.readOnlyCompareValue;
                                     break;
                        case "<>" :  return model && (model[conditionsOperand[0]] ) != p.readOnlyCompareValue;
                                     break;
                     }
                    
                } : 
                function (model){ 
                    if(conditionsOperand.length == 3) {

                        switch(conditionsOperand[1]){
                            case "+" : 
                                        switch(p.readOnlyOperator){
                                            case "=" : return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                        break;
                                            case "<" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                        break;
                                            case ">" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) > p.readOnlyCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) <= p.readOnlyCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) >= p.readOnlyCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                        break;
                                        }

                                        break;
                            case "-" : 
                                        switch(p.readOnlyOperator){
                                            case "=" : return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                        break;
                                            case "<" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                        break;
                                            case ">" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]]   ) > p.readOnlyCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]]  ) <= p.readOnlyCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]]  ) >= p.readOnlyCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                        break;
                                        }

                                        break;
                            case "/" :  
                                        
                                            switch(p.readOnlyOperator){
                                                case "=" : return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                            break;
                                                case "<" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                            break;
                                                case ">" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]]   ) > p.readOnlyCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]]  ) <= p.readOnlyCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]]  ) >= p.readOnlyCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                            break;
                                            }
                                        break;
                            case "*" : 
                                            switch(p.readOnlyOperator){
                                                case "=" : return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                            break;
                                                case "<" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                            break;
                                                case ">" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]]   ) > p.readOnlyCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]]  ) <= p.readOnlyCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]]  ) >= p.readOnlyCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                        break;
                                            }
                                         break;

                         }

                    } else if(conditionsOperand.length == 5){

                    } 
                    
                })),
                // required: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
                required: (!p.required)?p.required:( p.requiredCondtion == ""? p.required:false),
                visible:(!p.visible)?!p.visible:( p.visibleCondition == ""? !p.visible:(hideconditionsOperand.length == 1?function (model){ 
                   
                    switch(p.visiableOperator){
                        case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                   } else{ return true;}
                                    break;
                        case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                    break;
                        case ">" : if( model && (model[hideconditionsOperand[0]] ) > p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                    break;
                        case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                        break;
                        case ">=" :  if( model && (model[hideconditionsOperand[0]] )>= p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                     break;
                        case "<>" :  if( model && (model[hideconditionsOperand[0]] )!= p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                        break;
                        }
                    
                    } : 
                    function (model){ 
                        if(hideconditionsOperand.length == 3) {
    
                            switch(hideconditionsOperand[1]){
                                case "+" : 
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                    } else{ return true;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] ) > p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] ) != p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                            break;
                                            }
    
                                            break;
                                case "-" : 
                                            switch(p.visiableOperator){
                                                case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                        } else{ return true;}
                                                            break;
                                                case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case ">" : if( model && (model[hideconditionsOperand[0]] ) > p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                                case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<>" :  if( model && (model[hideconditionsOperand[0]] ) != p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                            }
    
                                            break;
                                case "/" :  
                                            
                                            switch(p.visiableOperator){
                                                case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                        } else{ return true;}
                                                            break;
                                                case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case ">" : if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                                case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<>" :  if( model && (model[hideconditionsOperand[0]] ) != p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                            }
                                            break;
                                case "*" : 
                                            switch(p.visiableOperator){
                                                case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                        } else{ return true;}
                                                            break;
                                                case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case ">" : if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                                case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<>" :  if( model && (model[hideconditionsOperand[0]] )!= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                            }
                                            break;
    
                            }
    
                        } else if(conditionsOperand.length == 5){
    
                        } 
                        
                })),

            }
            groupSchema["fields"] = new Array(schema);
        }
        if(p.type == "select" && p.groupLegendName != ""){

            schema = {

                type :"select",
                model: p.model,
                label : p.label,
                values : p.values,
                help:  p.help,
                featured: p.featured,
                default: p.default?p.useStdDefault:"",
                validator:  VueFormGenerator.validators.required,
                disabled: (!p.readonly)? p.readonly:( (p.readOnlyCondition == "") ? p.readonly:(conditionsOperand.length == 1?function (model){ 
                   
                    switch(p.readOnlyOperator){
                        case "=" :  return model && ((model[conditionsOperand[0]] ) == p.readOnlyCompareValue);
                                    break;
                        case "<" :  return model && (model[conditionsOperand[0]] ) < p.readOnlyCompareValue;
                                    break;
                        case ">" :  return model && (model[conditionsOperand[0]] ) > p.readOnlyCompareValue;
                                    break;
                        case "<=" :  return model && (model[conditionsOperand[0]] ) <= p.readOnlyCompareValue;
                                     break;
                        case ">=" :  return model && (model[conditionsOperand[0]] ) >= p.readOnlyCompareValue;
                                     break;
                        case "<>" :  return model && (model[conditionsOperand[0]] ) != p.readOnlyCompareValue;
                                     break;
                     }
                    
                } : 
                function (model){ 
                    if(conditionsOperand.length == 3) {

                        switch(conditionsOperand[1]){
                            case "+" : 
                                        switch(p.readOnlyOperator){
                                            case "=" : return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                        break;
                                            case "<" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                        break;
                                            case ">" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) > p.readOnlyCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) <= p.readOnlyCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) >= p.readOnlyCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[conditionsOperand[0]] + model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                        break;
                                        }

                                        break;
                            case "-" : 
                                        switch(p.readOnlyOperator){
                                            case "=" : return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                        break;
                                            case "<" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                        break;
                                            case ">" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]]   ) > p.readOnlyCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]]  ) <= p.readOnlyCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]]  ) >= p.readOnlyCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[conditionsOperand[0]] - model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                        break;
                                        }

                                        break;
                            case "/" :  
                                        
                                            switch(p.readOnlyOperator){
                                                case "=" : return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                            break;
                                                case "<" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                            break;
                                                case ">" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]]   ) > p.readOnlyCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]]  ) <= p.readOnlyCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]]  ) >= p.readOnlyCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[conditionsOperand[0]] / model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                            break;
                                            }
                                        break;
                            case "*" : 
                                            switch(p.readOnlyOperator){
                                                case "=" : return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]] )== p.readOnlyCompareValue;
                                                            break;
                                                case "<" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]] ) < p.readOnlyCompareValue;
                                                            break;
                                                case ">" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]]   ) > p.readOnlyCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]]  ) <= p.readOnlyCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]]  ) >= p.readOnlyCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[conditionsOperand[0]] * model[conditionsOperand[2]] ) != p.readOnlyCompareValue;
                                                        break;
                                            }
                                         break;

                         }

                    } else if(conditionsOperand.length == 5){

                    } 
                    
                })),
                // required: function (model){ return model && (model[conditionsOperand[0]] )== p.readOnlyCompareValue}
                required: (!p.required)?p.required:( p.requiredCondtion == ""? p.required:false),
                visible:(!p.visible)?!p.visible:( p.visibleCondition == ""? !p.visible:(hideconditionsOperand.length == 1?function (model){ 
                   
                    switch(p.visiableOperator){
                        case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                   } else{ return true;}
                                    break;
                        case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                    break;
                        case ">" : if( model && (model[hideconditionsOperand[0]] ) > p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                    break;
                        case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                        break;
                        case ">=" :  if( model && (model[hideconditionsOperand[0]] )>= p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                     break;
                        case "<>" :  if( model && (model[hideconditionsOperand[0]] )!= p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                        return false;
                                     }else{ return true;}
                                        break;
                        }
                    
                    } : 
                    function (model){ 
                        if(hideconditionsOperand.length == 3) {
    
                            switch(hideconditionsOperand[1]){
                                case "+" : 
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                    } else{ return true;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] ) > p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] ) != p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                            return false;
                                                        }else{ return true;}
                                                            break;
                                            }
    
                                            break;
                                case "-" : 
                                            switch(p.visiableOperator){
                                                case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                        } else{ return true;}
                                                            break;
                                                case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case ">" : if( model && (model[hideconditionsOperand[0]] ) > p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                                case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<>" :  if( model && (model[hideconditionsOperand[0]] ) != p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                            }
    
                                            break;
                                case "/" :  
                                            
                                            switch(p.visiableOperator){
                                                case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                        } else{ return true;}
                                                            break;
                                                case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case ">" : if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                                case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<>" :  if( model && (model[hideconditionsOperand[0]] ) != p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                            }
                                            break;
                                case "*" : 
                                            switch(p.visiableOperator){
                                                case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                        } else{ return true;}
                                                            break;
                                                case "<" :  if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case ">" : if( model && (model[hideconditionsOperand[0]] ) < p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<=" :  if( model && (model[hideconditionsOperand[0]] ) <= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                                case ">=" :  if( model && (model[hideconditionsOperand[0]] ) >= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                            break;
                                                case "<>" :  if( model && (model[hideconditionsOperand[0]] )!= p.visialbeCompareValue){
                                                                if(p.visibleClearOnSave){(p.inputType == "number")?model[p.model] =0:model[p.model]=""; }
                                                                return false;
                                                            }else{ return true;}
                                                                break;
                                            }
                                            break;
    
                            }
    
                        } else if(conditionsOperand.length == 5){
    
                        } 
                        
                })),
            }
            groupSchema["fields"] = new Array(schema);
        }
       let flag = false;
        newSchema.forEach(e =>{
            if(e.legend == groupSchema.legend && groupSchema.legend != ""){
                flag = true;
                let data =e.fields;
                data.push(schema);
                e.fields= data;
            }
        });
        if(!flag && groupSchema.legend !=""){
            newSchema.push(groupSchema);
        }

    });

  
 return  newSchema;
}

function removeHash(value){
  
    return (value.replace('#','').replace('#',''));
}

export default generateGroupSchema;