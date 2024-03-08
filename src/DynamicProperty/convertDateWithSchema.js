import convertDate from '@/DynamicProperty/dateFormat.js'


const convertDateWithSchema = (schema, model, isDBConvert) =>{

    if(schema.length > 0){
        schema.forEach(element => {
            if(element.type == "date"){
                model[element.model] = convertDate(model[element.model],isDBConvert);
            }
        });
    }
}

export default convertDateWithSchema;