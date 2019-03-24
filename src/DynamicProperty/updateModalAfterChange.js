
import VueFormGenerator from 'vue-form-generator'
import ConvertNumber2Word from '@/DynamicProperty/NumberToWords.js'

const updateModalAfterChange = (schemas,headerModal,detailModal,footerModal,totalModal,detailSectionData,section) =>{
    var tempSchema = schemas;

    if(tempSchema.length >0){
         tempSchema.forEach(p =>{
    
          if(p.formula !=""){
            var Formula = p.formula.trim();
            var SVTCOLSUM = 'SVTCOLSUM', SVTCOLSUMGROUP = 'SVTCOLSUMGROUP', SVTAMTINWORDS = 'SVTAMTINWORDS', SVTROUND50 = 'SVTROUND50', SVTROUND100 = 'SVTROUND100', SVTROUND2 = 'SVTROUND2';
            var SVTROUNDOFFAMT = 'SVTROUNDOFFAMT', SVTCOLAVG = 'SVTCOLAVG', SVTGETGRIDDATA = 'SVTGETGRIDDATA';
            var formulaSplit = Formula.split("(");
            if (Formula.substring(0, 1) == '#' || Formula.substring(0, 1) == '(') {
                var FieldData = returnFormula(Formula,headerModal,detailModal,footerModal,totalModal).split('^');
                 Formula = FieldData[1];
                //  alert(Formula);
                //alert(JSON.stringify(FieldData));
                 var ouput;
                 try{
                     ouput = eval(Formula);
                 }catch(e){
                     ouput =0;
                 }
                 if(section =="header"){
                     headerModal[p.model]= parseFloat(ouput.toFixed(2));
                 }else if(section == "detail"){
                     detailModal[p.model] = parseFloat(ouput.toFixed(2));
                 }else if(section == "footer"){
                     footerModal[p.model] = parseFloat(ouput.toFixed(2));
                 }else if(section == "total"){
                     totalModal[p.model]= parseFloat(ouput.toFixed(2));
                 }
                
             } else{

                if (formulaSplit[0].toString().trim() == SVTCOLAVG) {
                    try {
                        var k = 0, AvgValue = 0
                        Formula = Formula.replace(SVTCOLAVG, '');
                        Formula = Formula.substr(2) //Remove first character from string
                        Formula = Formula.substr(0, Formula.length - 2) //Remove last character from string
                        detailSectionData.forEach( function(value, i){
                            for(var key in value){
                                if(key == Formula){
                                    AvgValue = AvgValue + parseFloat(value[key]);
                                    k = k + 1;
                                }
                            }
                        });
                        if(section =="header"){
                            headerModal[p.model]= (AvgValue / k).toFixed(2);
                        }else if(section == "detail"){
                            detailModal[p.model] = (AvgValue / k).toFixed(2);
                        }else if(section == "footer"){
                            footerModal[p.model] = (AvgValue / k).toFixed(2);
                        }else if(section == "total"){
                            totalModal[p.model]= (AvgValue / k).toFixed(2);
                        }
                    } catch (ex) { }
                }else if (formulaSplit[0].toString().trim() == SVTCOLSUM) {
                    try {
                        var k = 0, TotalValue = 0
                        Formula = Formula.replace(SVTCOLSUM, '');
                        Formula = Formula.substr(2) //Remove first character from string
                        Formula = Formula.substr(0, Formula.length - 2) //Remove last character from string

                        detailSectionData.forEach( function(value, i){
                            for(var key in value){
                                if(key == Formula){
                                    TotalValue = TotalValue + parseFloat(value[key]);
                                }
                            }
                        });
                        if(section =="header"){
                            headerModal[p.model]= TotalValue.toFixed(2);
                        }else if(section == "detail"){
                            detailModal[p.model] =TotalValue.toFixed(2);
                        }else if(section == "footer"){
                            footerModal[p.model] = TotalValue.toFixed(2);
                        }else if(section == "total"){
                            totalModal[p.model]= TotalValue.toFixed(2);
                        }

                    } catch (ex) { }
                }else if (formulaSplit[0].trim() == SVTAMTINWORDS) {
                    try {
                        var Type = 0;
                        Formula = Formula.replace(SVTAMTINWORDS, '');
                        Formula = Formula.replace('(', '');
                        Formula = Formula.replace(')', '');
                        var amtInWordsFrmla = Formula.split(',');
                        var value = amtInWordsFrmla[0];
                        var amountInWords = '';
                        value = value.substr(0, value.length - 1);
                        value = value.replace("#","");
                        if(headerModal.hasOwnProperty(value.toUpperCase())){
                            amountInWords = ConvertNumber2Word(headerModal[value.toUpperCase()],0);
                        }else if(detailModal.hasOwnProperty(value.toUpperCase())){
                            amountInWords = ConvertNumber2Word(detailModal[value.toUpperCase()],0);
                        }else if(footerModal.hasOwnProperty(value.toUpperCase())){
                            amountInWords = ConvertNumber2Word(footerModal[value.toUpperCase()],0);
                        } else if(totalModal.hasOwnProperty(value.toUpperCase())){
                            amountInWords = ConvertNumber2Word(totalModal[value.toUpperCase()],0);
                            //console.log('amount ing words after='+amountInWords);
                        }
                        
                        var textStyle = amtInWordsFrmla[2];
                        if (textStyle == undefined) { textStyle = "T"; }
                        var output ="";
                        switch (textStyle) {
                            case "U":                               
                               output = 'Rupee ' + amountInWords + only.toString().toUpperCase();
                                break;
                            case "L":
                                output = 'Rupee ' + amountInWords + only.toString().toLowerCase();
                                break;
                            case "T":
                                output = 'Rupee ' + amountInWords.toString().replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                                break;
                            default:
                                output = 'Rupee ' + amountInWords.toString().replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                                break;
                        }
                        if(section =="header"){
                            headerModal[p.model]= output;
                        }else if(section == "detail"){
                            detailModal[p.model] =output;
                        }else if(section == "footer"){
                            footerModal[p.model] = output;
                        }else if(section == "total"){
                            totalModal[p.model]= output;
                        }


                    } catch (ex) { }

                }else if (formulaSplit[0].trim() == SVTROUND50) {
                    Formula = Formula.replace(SVTROUND50, '');
                    FieldData = returnFormula(Formula,headerModal,detailModal,footerModal,totalModal).split('^');
                    Formula = FieldData[1];
                    if(section =="header"){
                        headerModal[p.model]= Math.round(eval(Formula)).toFixed(2).toString();
                    }else if(section == "detail"){
                        detailModal[p.model] =Math.round(eval(Formula)).toFixed(2).toString();
                    }else if(section == "footer"){
                        footerModal[p.model] = Math.round(eval(Formula)).toFixed(2).toString();
                    }else if(section == "total"){
                        totalModal[p.model]= Math.round(eval(Formula)).toFixed(2).toString();
                    }
                    
                }
                else if (formulaSplit[0].trim() == SVTROUND100) {
                    Formula = Formula.replace(SVTROUND100, '');
                    FieldData = returnFormula(Formula,headerModal,detailModal,footerModal,totalModal).split('^');
                    Formula = FieldData[1];
                    if(section =="header"){
                        headerModal[p.model]= Math.ceil(eval(Formula)).toFixed(2);
                    }else if(section == "detail"){
                        detailModal[p.model] =Math.ceil(eval(Formula)).toFixed(2);
                    }else if(section == "footer"){
                        footerModal[p.model] = Math.ceil(eval(Formula)).toFixed(2);
                    }else if(section == "total"){
                        totalModal[p.model]= Math.ceil(eval(Formula)).toFixed(2);
                    }
                }
                else if (formulaSplit[0].trim()== SVTROUND2) {
                    Formula = Formula.replace(SVTROUND2, '');
                    FieldData = returnFormula(Formula,headerModal,detailModal,footerModal,totalModal).split('^');
                    Formula = FieldData[1];
                    if(section =="header"){
                        headerModal[p.model]= parseFloat(eval(Formula).toFixed(2));
                    }else if(section == "detail"){
                        detailModal[p.model] = parseFloat(eval(Formula).toFixed(2));
                    }else if(section == "footer"){
                        footerModal[p.model] = parseFloat(eval(Formula).toFixed(2));
                    }else if(section == "total"){
                        totalModal[p.model]= parseFloat(eval(Formula).toFixed(2));
                    }
                }
                else if (formulaSplit[0].trim() == SVTROUNDOFFAMT) {
                    Formula = Formula.replace(SVTROUNDOFFAMT, '');
                    FieldData = returnFormula(Formula,headerModal,detailModal,footerModal,totalModal).split('^');
                    Formula = FieldData[1]; var roundOffAmt = eval(Formula).toFixed(0) - eval(Formula).toFixed(2);
                    if(section =="header"){
                        headerModal[p.model]= parseFloat(roundOffAmt.toFixed(2));
                    }else if(section == "detail"){
                        detailModal[p.model] = parseFloat(roundOffAmt.toFixed(2));
                    }else if(section == "footer"){
                        footerModal[p.model] = parseFloat(roundOffAmt.toFixed(2));
                    }else if(section == "total"){
                        totalModal[p.model]= parseFloat(roundOffAmt.toFixed(2));
                    }
                }else if (formulaSplit[0].toString() == SVTCOLSUMGROUP) {
                    var i = 0, TotalValue = 0
                    Formula = Formula.replace(SVTCOLSUMGROUP, '');
                    Formula = Formula.substr(2) //Remove first character from string
                    Formula = Formula.substr(0, Formula.length - 1) //Remove last character from string
                    var formulaValues = Formula.split(",");
                    var fldName = formulaValues[0].toString().substr(0, formulaValues[0].toString().length - 1);
                    var fldValue = formulaValues[1].toString().substr(0, formulaValues[1].toString().length - 1);
                    fldValue = fldValue.substr(1);
                    detailSectionData.forEach( function(value, i){
                        var bln = false;
                        for(var key in value){
                            if (key == fldValue && value[key] == parseFloat(formulaValues[3])) {
                                bln = true;
                            }
                            if (bln == true && key == fldName) {
                                TotalValue = TotalValue + parseFloat(value);
                            }
                        }
                    });
                    if(section =="header"){
                        headerModal[p.model]= parseFloat(TotalValue.toFixed(2));
                    }else if(section == "detail"){
                        detailModal[p.model] = parseFloat(TotalValue.toFixed(2));
                    }else if(section == "footer"){
                        footerModal[p.model] = parseFloat(TotalValue.toFixed(2));
                    }else if(section == "total"){
                        totalModal[p.model]= parseFloat(TotalValue.toFixed(2));
                    }
                }  
              }
            }

        });
    }
    return false;
 }

 function removeHash(value){
    return (value.replace('#','').replace('#',''));
}

//Get Cal culation formulas
function returnFormula(Formulas,headerModal,detailModal,footerModal,totalModal) {
    var separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
    var tokens = Formulas.trim().split(new RegExp(separators.join('|'), 'g'));
    var FieldCtrls = '';
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i] != "" && tokens[i].substring(0, 1) == '#') {
            FieldCtrls = FieldCtrls + tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase() + ',';
            let fieldProperty =tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase();
            if(headerModal.hasOwnProperty(fieldProperty)){
                Formulas = Formulas.replace(tokens[i], headerModal[fieldProperty]);
            }else if(detailModal.hasOwnProperty(fieldProperty)){
               // console.log('has property='+fieldProperty);
                Formulas = Formulas.replace(tokens[i], detailModal[fieldProperty]);
            }else if(footerModal.hasOwnProperty(fieldProperty)){
                Formulas = Formulas.replace(tokens[i], footerModal[fieldProperty]);
            }else if(totalModal.hasOwnProperty(fieldProperty)){
                Formulas = Formulas.replace(tokens[i], totalModal[fieldProperty]);
            }
            
        }
    }
    if (FieldCtrls != '') {
        FieldCtrls = FieldCtrls.substring(0, FieldCtrls.length - 1);
        return FieldCtrls + '^' + Formulas;
    }
}



export default updateModalAfterChange;