const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
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
    setBtn();
}

setBtn();

$("#cusId,#cusName,#cusAddress,#cusSalary").on("keydown keyup", function (e) {
    let indexNo = customerArray.indexOf(customerArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidation(customerArray[indexNo]);

    setBtn();

    if (e.key == "Enter") {

        if (e.target.id != customerArray[customerArray.length - 1].field.attr("id")) {
            if (checkValidation(customerArray[indexNo])) {
                customerArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidation(customerArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});
function checkValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object);
        return true;
    }
    setBorder(false, object)
    return false;
}
function setBorder(bol,object){
    if(bol){
        if (object.field.val().length >= 1) {
            object.field.css("border", "2px solid green");
        } else {
            object.field.css("border", "1px solid #ced4da");
        }
    }
    else {
        if (object.field.val().length >= 1) {
            object.field.css("border", "2px solid red");
        } else {
            object.field.css("border", "1px solid #ced4da");
        }
    }
}
function checkAll(){
    for (let i = 0; i < customerArray.length; i++) {
        if(!checkValidation(customerArray[i])) return  false;
    }
    return true
}
function setBtn(){
    $("#btnCustomerUpdate").prop("disabled", true);
    $("#btnCustomerDelete").prop("disabled", true);

    if (checkAll()){
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