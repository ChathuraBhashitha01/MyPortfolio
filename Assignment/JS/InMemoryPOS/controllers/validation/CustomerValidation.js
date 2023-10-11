const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{8,}$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let customerArray = new Array();

customerArray.push({field:$("#cusId"),regEx:CUS_ID_REGEX});
customerArray.push({field:$("#cusName"),redEx:CUS_NAME_REGEX});
customerArray.push({field:$("#cusAddress"),redEx:CUS_ADDRESS_REGEX});
customerArray.push({field:$("#cusSalary"),redEx:CUS_SALARY_REGEX});