import convertDate from '@/DynamicProperty/dateFormat.js'

const previewModalCalculation = (schema,model) =>{
    if(schema.length > 0){
        schema.forEach(element => {
            if(element.type == "select"){
                element.values.forEach( v=>{
                    if(model[element.model] == v.id){
                        model[element.model] = v.name;
                    }
                })
            }else if(element.type == "date"){
                model[element.model] = convertDate(model[element.model],false);
            }
        });
    }
}

export default previewModalCalculation;