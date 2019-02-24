import VueFormGenerator from 'vue-form-generator'

const generateSchema = (schemas, model) => {
    console.log('This is GenerateSchema Function', schemas);
    var tempSchema = schemas;
    var newSchema = [];
    tempSchema.forEach(p => {

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
 

        if(p.type == "input" && p.groupLegendName == ""){
        
           var schema = {
                type:(p.isComboBox)? "inputDropdown": "input",
                inputType:(p.inputType) =="text" ? "text": "number",
                model : p.model,
                label : p.label,
                min: p.min,
                max: p.max,
                hint: p.help,
                featured: p.featured,
                inputSelectId: p.comboBoxId,
                default: p.default?p.useStdDefault:"",
                //if inputDropdown
                values: p.values,
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
               required: (p.required)?p.required:( p.requiredCondtion == ""? p.required:(requiredconditionsOperand.length == 1?function (model){ 
                   
                switch(p.requiredOperator){
                    case "=" : return model && (model[requiredconditionsOperand[0]] )== p.requiredCompareValue;
                                break;
                    case "<" :  return model && (model[requiredconditionsOperand[0]] ) < p.requiredCompareValue;
                                break;
                    case ">" :  return model && (model[requiredconditionsOperand[0]] ) > p.requiredCompareValue;
                                break;
                    case "<=" :  return model && (model[requiredconditionsOperand[0]] ) <= p.requiredCompareValue;
                                 break;
                    case ">=" :  return model && (model[requiredconditionsOperand[0]] ) >= p.requiredCompareValue;
                                 break;
                    case "<>" :  return model && (model[requiredconditionsOperand[0]] ) != p.requiredCompareValue;
                                 break;
                 }
                
                } : 
                function (model){ 
                    if(requiredconditionsOperand.length == 3) {

                        switch(requiredconditionsOperand[1]){
                            case "+" : 
                                        switch(p.requiredOperator){
                                            case "=" : return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                        break;
                                            case "<" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                        break;
                                            case ">" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                        break;
                                        }

                                        break;
                            case "-" : 
                                        switch(p.requiredOperator){
                                            case "=" : return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                        break;
                                            case "<" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                        break;
                                            case ">" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                        break;
                                        }

                                        break;
                            case "/" :  
                                        
                                            switch(p.requiredOperator){
                                                case "=" : return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                            break;
                                                case "<" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                            break;
                                                case ">" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                            break;
                                            }
                                        break;
                            case "*" : 
                                            switch(p.requiredOperator){
                                                case "=" : return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                            break;
                                                case "<" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                            break;
                                                case ">" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                        break;
                                            }
                                        break;

                        }

                    } else if(conditionsOperand.length == 5){

                    } 
                    
                })),
                hide:(p.visible)?p.visible:( p.visibleCondition == ""? p.visible:(hideconditionsOperand.length == 1?function (model){ 
                   
                switch(p.visiableOperator){
                    case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                    if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                    return true;
                               } else{ return false;}
                                break;
                    case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                    if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                    return true;
                                 }
                                break;
                    case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                    if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                    return true;
                                 }
                                break;
                    case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                    if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                    return true;
                                 }
                                    break;
                    case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                    if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                    return true;
                                 }
                                 break;
                    case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                    if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                    return true;
                                 }
                                    break;
                    }
                
                } : 
                function (model){ 
                    if(hideconditionsOperand.length == 3) {

                        switch(hideconditionsOperand[1]){
                            case "+" : 
                                    switch(p.visiableOperator){
                                        case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                } else{ return false;}
                                                    break;
                                        case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                    break;
                                        case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                    break;
                                        case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                        break;
                                        case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                    break;
                                        case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                        break;
                                        }

                                        break;
                            case "-" : 
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                    } else{ return false;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                        }

                                        break;
                            case "/" :  
                                        
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                    } else{ return false;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                        }
                                        break;
                            case "*" : 
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                    } else{ return false;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                        }
                                        break;

                        }

                    } else if(conditionsOperand.length == 5){

                    } 
                    
                })),

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
               required: (p.required)?p.required:( p.requiredCondtion == ""? p.required:(requiredconditionsOperand.length == 1?function (model){ 
                   
                switch(p.requiredOperator){
                    case "=" : return model && (model[requiredconditionsOperand[0]] )== p.requiredCompareValue;
                                break;
                    case "<" :  return model && (model[requiredconditionsOperand[0]] ) < p.requiredCompareValue;
                                break;
                    case ">" :  return model && (model[requiredconditionsOperand[0]] ) > p.requiredCompareValue;
                                break;
                    case "<=" :  return model && (model[requiredconditionsOperand[0]] ) <= p.requiredCompareValue;
                                 break;
                    case ">=" :  return model && (model[requiredconditionsOperand[0]] ) >= p.requiredCompareValue;
                                 break;
                    case "<>" :  return model && (model[requiredconditionsOperand[0]] ) != p.requiredCompareValue;
                                 break;
                 }
                
                } : 
                function (model){ 
                    if(requiredconditionsOperand.length == 3) {

                        switch(requiredconditionsOperand[1]){
                            case "+" : 
                                        switch(p.requiredOperator){
                                            case "=" : return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                        break;
                                            case "<" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                        break;
                                            case ">" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[requiredconditionsOperand[0]] + model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                        break;
                                        }

                                        break;
                            case "-" : 
                                        switch(p.requiredOperator){
                                            case "=" : return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                        break;
                                            case "<" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                        break;
                                            case ">" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                        break;
                                            case "<=" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                        break;
                                            case ">=" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                        break;
                                            case "<>" :  return model && (model[requiredconditionsOperand[0]] - model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                        break;
                                        }

                                        break;
                            case "/" :  
                                        
                                            switch(p.requiredOperator){
                                                case "=" : return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                            break;
                                                case "<" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                            break;
                                                case ">" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[requiredconditionsOperand[0]] / model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                            break;
                                            }
                                        break;
                            case "*" : 
                                            switch(p.requiredOperator){
                                                case "=" : return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]] )== p.requiredCompareValue;
                                                            break;
                                                case "<" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]] ) < p.requiredCompareValue;
                                                            break;
                                                case ">" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]]   ) > p.requiredCompareValue;
                                                            break;
                                                case "<=" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]]  ) <= p.requiredCompareValue;
                                                            break;
                                                case ">=" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]]  ) >= p.requiredCompareValue;
                                                            break;
                                                case "<>" :  return model && (model[requiredconditionsOperand[0]] * model[requiredconditionsOperand[2]] ) != p.requiredCompareValue;
                                                        break;
                                            }
                                        break;

                        }

                    } else if(conditionsOperand.length == 5){

                    } 
                    
                })),
                hide:(p.visible)?p.visible:( p.visibleCondition == ""? p.visible:(hideconditionsOperand.length == 1?function (model){ 
                   
                    switch(p.visiableOperator){
                        case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                        return true;
                                   } else{ return false;}
                                    break;
                        case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                        return true;
                                     }
                                    break;
                        case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                        return true;
                                     }
                                    break;
                        case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                        return true;
                                     }
                                        break;
                        case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                        return true;
                                     }
                                     break;
                        case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                        return true;
                                     }
                                        break;
                    }
                
                } : 
                function (model){ 
                    if(hideconditionsOperand.length == 3) {

                        switch(hideconditionsOperand[1]){
                            case "+" : 
                                    switch(p.visiableOperator){
                                        case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                } else{ return false;}
                                                    break;
                                        case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                    break;
                                        case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                    break;
                                        case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                        break;
                                        case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                    break;
                                        case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                        if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                        return true;
                                                    }
                                                        break;
                                        }

                                        break;
                            case "-" : 
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                    } else{ return false;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                        }

                                        break;
                            case "/" :  
                                        
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                    } else{ return false;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                        }
                                        break;
                            case "*" : 
                                        switch(p.visiableOperator){
                                            case "=" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                    } else{ return false;}
                                                        break;
                                            case "<" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case ">" : if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                            case ">=" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                        break;
                                            case "<>" :  if( model && (model[hideconditionsOperand[0]] )== p.visialbeCompareValue){
                                                            if(p.visibleClearOnSave){model[hideconditionsOperand[0]]= ""; }
                                                            return true;
                                                        }
                                                            break;
                                        }
                                        break;

                        }

                    } else if(conditionsOperand.length == 5){

                    } 
                    
                })),
            }
            newSchema.push(schema);
        }


    });

    // console.log('Schemeaaa='+JSON.stringify(newSchema));
  
 return  newSchema;
}

function removeHash(value){
  
    return (value.replace('#','').replace('#',''));
}

export default generateSchema;