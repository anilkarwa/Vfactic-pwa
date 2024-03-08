
const convertDate = (value, isDBConvert ) =>{
    if(!value || value== '') return '';
    if(isDBConvert){
        const [day, month, year] = value.split('/')
        return `${month}/${day}/${year}`
    } else{
        let newValue = value.split('T');
        
        if(newValue[0]== '1900-01-01'){
            return '';
        }
        let date = new Date(newValue[0]).toISOString().substr(0, 10)
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
    }
    
}

export default convertDate;