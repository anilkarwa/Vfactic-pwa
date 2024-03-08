import convertDate from '@/DynamicProperty/dateFormat.js'

const convertDateDetailSection = (schema,model, isDBConvert) =>{

    if(schema.length > 0){
        schema.forEach(element => {
            if(element.type == "date"){
                model.forEach(e => {
                 e[element.model] = convertDate(e[element.model],isDBConvert);
                });
                
            }
        });
    }
}
export default convertDateDetailSection;