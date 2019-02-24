const generateNewModal = (schemas, model) => {
    var tempSchema = schemas;
    var newModal = [];
    
    tempSchema.forEach(element => {
        if(element.default== true){
            model[element.model]= element.useStdDefault;
        }
    });
   return model;
};

export default generateNewModal;