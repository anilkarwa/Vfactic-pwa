import VueFormGenerator from 'vue-form-generator'

const generatePostDocEntrySchema = (schema) =>{

    var newSchema = [];

    schema.forEach(p =>{
        if(p.FIELDTYPE != "DATE"){
            var schema = {
                type :"input",
                inputType :(p.FIELDTYPE) =="TEXT" ? "text": "number",
                model: p.FLDNAME.toUpperCase(),
                label: p.FLDNAME,
                step: (p.FIELDTYPE) =="TEXT" ? "": "any",
                maxlength:p.COLDATAWIDTH,
                visible:p.COLHIDE == "Y"?false:true,
                disabled: p.ALLOWEDIT =="N"?true:false
            }
            newSchema.push(schema);
        }else{
            var schema ={
                type: "cleave",
                model : p.FLDNAME.toUpperCase(),
                label : p.FLDNAME,
                placeholder: 'dd/mm/yyyy',
                cleaveOptions: {
                    date: true,
                    datePattern: ['d', 'm', 'Y'],
                    delimiter: '/',
                },
                visible:p.COLHIDE == "Y"?false:true,
                disabled: p.ALLOWEDIT =="N"?true:false
            }
            newSchema.push(schema);
        }
    });
  return  newSchema;
}

export default generatePostDocEntrySchema;