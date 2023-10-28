const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{2,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let customerArray = new Array();

customerArray.push({field:$("#cusId"), regEx:CUS_ID_REGEX});
customerArray.push({field:$("#cusName"), regEx:CUS_NAME_REGEX});
customerArray.push({field:$("#cusAddress"), regEx:CUS_ADDRESS_REGEX});
customerArray.push({field:$("#cusSalary"), regEx:CUS_SALARY_REGEX});

function clearCustomerInputField(){
    $("#cusId,#cusName,#cusAddress,#cusSalary").val("");
    $("#cusId,#cusName,#cusAddress,#cusSalary").css('border','1px solid #ced4da');
    $("#cusId").focus();
    setCustomerBtn();
}

setCustomerBtn();

$("#cusId,#cusName,#cusAddress,#cusSalary").on("keydown keyup", function (e) {
    let indexNo = customerArray.indexOf(customerArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkCustomerValidation(customerArray[indexNo]);

    setCustomerBtn();

    if (e.key == "Enter") {

        if (e.target.id != customerArray[customerArray.length - 1].field.attr("id")) {
            if (checkCustomerValidation(customerArray[indexNo])) {
                customerArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkCustomerValidation(customerArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});
function checkCustomerValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setCustomerBorder(true, object);
        return true;
    }
    setCustomerBorder(false, object)
    return false;
}
function setCustomerBorder(bol,object){
    if(!bol){
        if (object.field.val().length >= 1) {
            object.field.css("border", "2px solid red");
        } else {
            object.field.css("border", "1px solid #ced4da");
        }
    }
    else {
        if (object.field.val().length >= 1) {
            object.field.css("border", "2px solid green");
        } else {
            object.field.css("border", "1px solid #ced4da");
        }
    }
}
function checkCustomerAll(){
    for (let i = 0; i < customerArray.length; i++) {
        if(!checkCustomerValidation(customerArray[i])) return  false;
    }
    return true
}
function setCustomerBtn(){
    $("#btnCustomerUpdate").prop("disabled", true);
    $("#btnCustomerDelete").prop("disabled", true);

    if (checkCustomerAll()){
        $("#btnSaveCustomer").prop("disabled", false);
    }
    else {
        $("#btnSaveCustomer").prop("disabled", true);
    }

    let id = $("#cusId").val();
    if (searchCustomer(id) == undefined) {
        $("#btnCustomerDelete").prop("disabled", true);
        $("#btnCustomerUpdate").prop("disabled", true);
    } else {
        $("#btnCustomerDelete").prop("disabled", false);
        $("#btnCustomerUpdate").prop("disabled", false);
    }
}