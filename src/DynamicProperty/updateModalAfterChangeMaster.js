
import VueFormGenerator from 'vue-form-generator'
import ConvertNumber2Word from '@/DynamicProperty/NumberToWords.js'

const updateModalAfterChangeMaster = (schemas,model) =>{
    var tempSchema = schemas;

    if(tempSchema.length >0){
         tempSchema.forEach(p =>{
    
          if(p.formula !=""){
            var Formula = p.formula.trim();
            var SVTCOLSUM = 'SVTCOLSUM', SVTCOLSUMGROUP = 'SVTCOLSUMGROUP', SVTAMTINWORDS = 'SVTAMTINWORDS', SVTROUND50 = 'SVTROUND50', SVTROUND100 = 'SVTROUND100', SVTROUND2 = 'SVTROUND2';
            var SVTROUNDOFFAMT = 'SVTROUNDOFFAMT', SVTCOLAVG = 'SVTCOLAVG', SVTGETGRIDDATA = 'SVTGETGRIDDATA';
            var formulaSplit = Formula.split("(");
            if (Formula.substring(0, 1) == '#' || Formula.substring(0, 1) == '(') {
                var FieldData = returnFormula(Formula,model).split('^');
                 Formula = FieldData[1];
                //  alert(Formula);
                //alert(JSON.stringify(FieldData));
                 var ouput;
                 try{
                     ouput = eval(Formula);
                 }catch(e){
                     ouput =0;
                 }
                 model[p.model]= parseFloat(ouput.toFixed(2));
                
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
                        model[p.model]= (AvgValue / k).toFixed(2);
                        
                    } catch (ex) { }
                }else if (formulaSplit[0].trim() == SVTROUND50) {
                    Formula = Formula.replace(SVTROUND50, '');
                    FieldData = returnFormula(Formula,model).split('^');
                    Formula = FieldData[1];

                    model[p.model]= Math.round(eval(Formula)).toFixed(2).toString();
                    
                }
                else if (formulaSplit[0].trim() == SVTROUND100) {
                    Formula = Formula.replace(SVTROUND100, '');
                    FieldData = returnFormula(Formula,model).split('^');
                    Formula = FieldData[1];

                    model[p.model]= Math.ceil(eval(Formula)).toFixed(2);
                    
                }
                else if (formulaSplit[0].trim()== SVTROUND2) {
                    Formula = Formula.replace(SVTROUND2, '');
                    FieldData = returnFormula(Formula,model).split('^');
                    Formula = FieldData[1];

                    model[p.model]= parseFloat(eval(Formula).toFixed(2));
                    
                }
                else if (formulaSplit[0].trim() == SVTROUNDOFFAMT) {
                    Formula = Formula.replace(SVTROUNDOFFAMT, '');
                    FieldData = returnFormula(Formula,model).split('^');
                    Formula = FieldData[1]; var roundOffAmt = eval(Formula).toFixed(0) - eval(Formula).toFixed(2);

                    model[p.model]= parseFloat(roundOffAmt.toFixed(2));
                    
                } 
              }
            }

        });
    }
    return false;
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


export default updateModalAfterChangeMaster;