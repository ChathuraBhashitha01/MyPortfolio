getAllItems();
loadCustomerIDs();
$("#btnItemSave").click(function (){
    if (checkAll()) {
        saveItem();
    }
    else {
        alert("Faild Saved");
    }
});

$("#btnItemGetAll").click(function (){
    getAllItems();
});

$("#btnItemDelete").click(function (){
    let id=$("#txtItemCode").val();
    if (searchItem(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to Delete this customer.?");
        if (consent) {
            for (let i = 0; i < itemDB.length; i++) {
                if (itemDB[i].code == id) {
                    itemDB.splice(i, 1);
                    return true;
                }
            }
            loadCustomerIDs();
            getAllItems();
            clearAllField();
        }
    }
    return false;
});

$("#btnItemUpdate").click(function (){
    let id=$("#txtItemCode").val();
    if (searchItem(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let item = searchCustomer(id);

            let name = $("#txtItemName").val();
            let price = $("#txtItemPrice").val();
            let qty = $("#txtItemQty").val();

            item.name = name;
            item.unitPrice = price;
            item.qtyOnHand = qty;

            getAllItems();
            clearAllField();
        }
    }
});

$("#btnItemSearch").click(function (){
    let code=$("#cmbItemCode").val();
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code==code){
            $("#txtItemCode").val(itemDB[i].code)
            $("#txtItemName").val(itemDB[i].name)
            $("#cusAddress").val(itemDB[i].unitPrice)
            $("#cusSalary").val(itemDB[i].qtyOnHand)
        }
    }
});

function saveItem() {
    let code = $("#txtItemCode").val();

    if (searchItem(code.trim()) == undefined){
        let name = $("#txtItemName").val();
        let price = $("#txtItemPrice").val();
        let qty = $("#txtItemQty").val();

        let newItem = Object.assign({}, item);
        newItem.code = code;
        newItem.name = name;
        newItem.unitPrice = price;
        newItem.qtyOnHand = qty;

        itemDB.push(newItem);
        clearCustomerInputField();
        loadCustomerIDs();
        getAllItems();
        clearAllField();
    }
    else {
        alert("Item already exits.!");
        clearCustomerInputField();
    }
}

function searchItem(code){
    return itemDB.find(function (item){
        return item.code==code;
    });
}

