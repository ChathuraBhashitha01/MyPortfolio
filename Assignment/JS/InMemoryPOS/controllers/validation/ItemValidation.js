const ITEM_CODE_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{2,}$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{})?$/;
const ITEM_QTY_REGEX = /^[0-9]{2,}([.][0-9]{1})?$/;

let itemArray = new Array();

itemArray.push({field:$("#txtItemCode"), regEx:ITEM_CODE_REGEX});
itemArray.push({field:$("#txtItemName"), regEx:ITEM_NAME_REGEX});
itemArray.push({field:$("#txtItemPrice"), regEx:ITEM_PRICE_REGEX});
itemArray.push({field:$("#txtItemQty"), regEx:ITEM_QTY_REGEX});

function clearItemInputField(){
    $("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").val("");
    $("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").css('border','1px solid #ced4da');
    $("#txtItemCode").focus();
    setBtn();
}

setBtn();

$("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").on("keydown keyup", function (e) {
    let indexNo = itemArray.indexOf(itemArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidation(itemArray[indexNo]);

    setBtn();

    if (e.key == "Enter") {

        if (e.target.id != itemArray[itemArray.length - 1].field.attr("id")) {
            if (checkValidation(itemArray[indexNo])) {
                itemArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidation(itemArray[indexNo])) {
                saveItem();
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
    for (let i = 0; i < itemArray.length; i++) {
        if(!checkValidation(itemArray[i])) return  false;
    }
    return true
}
function setBtn(){
    $("#btnItemUpdate").prop("disabled", true);
    $("#btnItemDelete").prop("disabled", true);

    if (checkAll()){
        $("#btnItemSave").prop("disabled", false);
    }
    else {
        $("#btnItemSave").prop("disabled", true);
    }

    let code = $("#txtItemCode").val();
    if (searchItem(code) == undefined) {
        $("#btnItemUpdate").prop("disabled", true);
        $("#btnItemDelete").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }
}