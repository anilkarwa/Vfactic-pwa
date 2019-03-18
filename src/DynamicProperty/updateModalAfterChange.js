
import VueFormGenerator from 'vue-form-generator'
const updateModalAfterChange = (schemas,headerModal,detailModal,footerModal,totalModal,detailSectionData,section) =>{
    var tempSchema = schemas;

    if(tempSchema.length >0){
         tempSchema.forEach(p =>{
      
          var formula="";
          if(p.formula !=""){
              if(p.formula.includes("SVT")){ //check for function or not

              }else{//only formula
               // console.log(p.formula);
                var Formula = p.formula.trim();
                if (Formula.substring(0, 1) == '#' || Formula.substring(0, 1) == '(') {
                   var FieldData = returnFormula(Formula,headerModal,detailModal,footerModal,totalModal).split('^');
                    Formula = FieldData[1];
                    //alert(Formula);
                    var ouput;
                    try{
                        ouput = eval(Formula);
                    }catch(e){
                        ouput =0;
                    }
                    if(section =="header"){
                        headerModal[p.model]= ouput;
                    }else if(section == "detail"){
                        detailModal[p.model] = ouput;
                    }else if(section == "footer"){
                        footerModal[p.model] = ouput;
                    }else if(section == "total"){
                        totalModal[p.model]= ouput;
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
    var tokens = Formulas.split(new RegExp(separators.join('|'), 'g'));
    var FieldCtrls = '';
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i] != "" && tokens[i].substring(0, 1) == '#') {
            FieldCtrls = FieldCtrls + tokens[i].substring(0, tokens[i].length - 1).replace('#','') + ',';
            if(headerModal.hasOwnProperty(tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase())){
                Formulas = Formulas.replace(tokens[i], headerModal[tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase()]);
            }else if(detailModal.hasOwnProperty(tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase())){
               // console.log('has property='+tokens[i].substring(0, tokens[i].length - 1).replace('#',''));
                Formulas = Formulas.replace(tokens[i], detailModal[tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase()]);
            }else if(footerModal.hasOwnProperty(tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase())){
                Formulas = Formulas.replace(tokens[i], footerModal[tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase()]);
            }else if(totalModal.hasOwnProperty(tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase())){
                Formulas = Formulas.replace(tokens[i], totalModal[tokens[i].substring(0, tokens[i].length - 1).replace('#','').toUpperCase()]);
            }
            
        }
    }
    if (FieldCtrls != '') {
        FieldCtrls = FieldCtrls.substring(0, FieldCtrls.length - 1);
        return FieldCtrls + '^' + Formulas;
    }
}

export default updateModalAfterChange;