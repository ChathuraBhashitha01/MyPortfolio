getAllItems();
loadItemCodes();
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
        let consent = confirm("Do you really want to Delete this item.?");
        if (consent) {
            for (let i = 0; i < itemDB.length; i++) {
                if (itemDB[i].code == id) {
                    itemDB.splice(i, 1);
                    return true;
                }
            }
            loadItemCodes();
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
        let consent = confirm("Do you really want to update this item.?");
        if (consent) {
            let item = searchCustomer(id);

            let name = $("#txtItemName").val();
            let price = $("#txtItemPrice").val();
            let qty = $("#txtItemQty").val();

            item.description = name;
            item.unitPrice = price;
            item.qtyOnHand = qty;

            getAllItems();
            loadItemCodes();
            clearAllField();
        }
    }
});

$("#btnItemSearch").click(function (){
    let code=$("#cmbItemCode").val();
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code==code){
            $("#txtItemCode").val(itemDB[i].code)
            $("#txtItemName").val(itemDB[i].description)
            $("#txtItemPrice").val(itemDB[i].unitPrice)
            $("#txtItemQty").val(itemDB[i].qtyOnHand)
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
        newItem.description = name;
        newItem.unitPrice = price;
        newItem.qtyOnHand = qty;

        itemDB.push(newItem);
        clearCustomerInputField();
        loadItemCodes();
        getAllItems();
        clearAllField();
    }
    else {
        alert("Item already exits.!");
        clearCustomerInputField();
    }
}

function searchItem(code){
    return itemDB.find(function(item){
        return item.code==code;
    });
}

function getAllItems(){
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let code=itemDB[i].code;
        let name=itemDB[i].description;
        let price=itemDB[i].unitPrice;
        let qty=itemDB[i].qtyOnHand;

        let row=`<tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td>${qty}</td>
                </tr>`;
        $("#tblItem").append(row);
        bindTrEvents();
    }
}
function bindTrEvents() {
    $("#tblItem>tr").click(function (){
        let code=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let price=$(this).children().eq(2).text();
        let qty=$(this).children().eq(3).text();

        $("#txtItemCode").val(code)
        $("#txtItemName").val(name)
        $("#txtItemPrice").val(price)
        $("#txtItemQty").val(qty)
    });
}
function loadItemCodes(){
    $("#cmbItemCode").empty();
    for (let i = 0; i <itemDB.length ; i++) {
        let code=itemDB[i].code;
        $("#cmbItemCode").append("<option >"+code +"</option>");
    }
}
function clearAllField(){
    clearCustomerInputField();
}