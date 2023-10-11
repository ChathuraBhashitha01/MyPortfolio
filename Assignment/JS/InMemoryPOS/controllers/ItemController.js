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
    return itemDB.find(function(item){
        return item.code==code;
    });
}

function getAllItems(){
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let code=itemDB[i].code;
        let name=itemDB[i].name;
        let price=itemDB[i].unitPrice;
        let qty=itemDB[i].qtyOnHand;

        let row=`<tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${price}</td
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
function loadCustomerIDs(){
    $("#cmbItemCode").empty();
    for (let i = 0; i <itemDB.length ; i++) {
        let code=itemDB[i].code;
        $("#cmbCustomerID").append("<option >"+code +"</option>");
    }
}
function clearAllField(){
    clearCustomerInputField();
}