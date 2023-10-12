const ORDER_ID_REGEX = /^(OR00-)[0-9]{3}$/;

let placeOrderArray=new Array();
placeOrderArray.push({field:$("#txtOrderId"), regEx:ORDER_ID_REGEX});
placeOrderArray.push({field:$("#cmbCustomer"), regEx:CUS_ID_REGEX});
placeOrderArray.push({field:$("#txtCustomerName"), regEx:CUS_NAME_REGEX});
placeOrderArray.push({field:$("#txtCustomerAddress"), regEx:CUS_ADDRESS_REGEX});
placeOrderArray.push({field:$("#txtCustomerSalary"), regEx:CUS_SALARY_REGEX});
placeOrderArray.push({field:$("#cmbItemCode"), regEx:ITEM_CODE_REGEX});
placeOrderArray.push({field:$("#txtGetItemName"), regEx:ITEM_NAME_REGEX});
placeOrderArray.push({field:$("#txtGetItemPrice"), regEx:ITEM_PRICE_REGEX});
placeOrderArray.push({field:$("#txtGetQtyOnHand"), regEx:ITEM_QTY_REGEX});



$("#txtOrderId,#cmbCustomer,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary,#cmbItemCode,#txtGetItemName,#txtGetItemPrice,#txtGetQtyOnHand").on("keydown keyup", function (e) {
    let indexNo = placeOrderArray.indexOf(placeOrderArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidation(placeOrderArray[indexNo]);

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
