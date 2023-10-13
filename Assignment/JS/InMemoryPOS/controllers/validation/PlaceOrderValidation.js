const ORDER_ID_REGEX = /^(OR00-)[0-9]{3}$/;
const ITEM_ORDER_QTY_REGEX = /^[0-9]{1,}([.][0-9]{1})?$/;

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
placeOrderArray.push({field:$("#txtOrderQty"), regEx:ITEM_ORDER_QTY_REGEX});

function clearPlaceOrderInputField(){
    $("#txtOrderId,#cmbCustomer,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary,#cmbItemCode,#txtGetItemName,#txtGetItemPrice,#txtGetQtyOnHand,#txtOrderQty,#txtDate,#txtCash,#txtDiscount,#txtBalance").val("");
    $("#txtOrderId,#cmbCustomer,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary,#cmbItemCode,#txtGetItemName,#txtGetItemPrice,#txtGetQtyOnHand,#txtOrderQty,#txtDate,#txtCash,#txtDiscount,#txtBalance").css('border','1px solid #ced4da');
    $("#txtTotal,#txtSubtotal").text("");
    $('#tblPlaceOrder>tr').each(function (e) {
        $(this).children().eq(0).text("");
        $(this).children().eq(1).text("");
        $(this).children().eq(2).text("");
        $(this).children().eq(3).text("");
        $(this).children().eq(4).text("");
    });
    $("#txtOrderId").focus();
    setBtn();
}


$("#txtOrderId,#cmbCustomer,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary,#cmbItemCode,#txtGetItemName,#txtGetItemPrice,#txtGetQtyOnHand,#txtOrderQty").on("keydown keyup", function (e) {
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
