loadCustomerIDs();
loadItemsCodes();

$("#btnPurchase").click(function (){
    placeOrder();
    loadItemsCodes();
    loadCustomerIDs();
})

function loadCustomerIDs(){
    $("#cmbCustomer").empty();
    for (let i = 0; i <customerDB.length ; i++) {
        let id=customerDB[i].id;
        $("#cmbCustomer").append("<option >"+id +"</option>");
    }
}

$("#cmbCustomer").change(function () {
    $(this).val($(this).val());
    var customer = searchCustomer($(this).val());
    $("#txtCustomerName").val(customer.name);
    $("#txtCustomerAddress").val(customer.address);
    $("#txtCustomerSalary").val(customer.salary);


});

function loadItemsCodes(){
    $("#cmdItems").empty();
    //$("#cmdItems").append("<option >"+" "+"</option>");
    for (let i = 0; i <itemDB.length ; i++) {
        let id=itemDB[i].code;
        $("#cmdItems").append("<option >"+id +"</option>");
    }
}

$("#cmdItems").change(function () {
    $(this).val($(this).val());
    var item = searchItem($(this).val());
    $("#txtGetItemName").val(item.description);
    $("#txtGetItemPrice").val(item.unitPrice);
    $("#txtGetQtyOnHand").val(item.qtyOnHand);

});

$("#btnAddItem").click(function () {
    let id = $("#cmdItems").val();
    let name = $("#txtGetItemName").val();
    let price = $("#txtGetItemPrice").val();
    let qty = $("#txtOrderQty").val();
    let total = parseFloat(price) * parseFloat(qty);
    let allTotal = 0;
    let existsItems = false;

    $('#tblPlaceOrder>tr').each(function (e) {
        let check =$(this).children().eq(0).text();
        if (id === check){
            let liQty = $(this).children().eq(3).text();
            let upQty = parseInt(liQty)+parseInt(qty);
            $(this).children().eq(1).text(name);
            $(this).children().eq(2).text(price);
            $(this).children().eq(3).text(upQty);
            $(this).children().eq(4).text(upQty * parseFloat(price));
            existsItems = true;
        }
    });

    if (!existsItems){
        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;

        $("#tblPlaceOrder").append(row);
    }
    $('#tblPlaceOrder>tr').each(function (e) {
        let total = $(this).children().eq(4).text();
        allTotal += parseFloat(total);
    });
    $("#txtTotal").text(allTotal);
    $("#txtSubtotal").text(allTotal);
});
function placeOrder(){
    let orderId=$("#txtOrderId").val();
    let cusId=$("#cmbCustomer").val();
    let date=$("#txtDate").val();
    // let code=$("#cmdItems").val();
    // let qty=$("#txtOrderQty").val();
    // let price=$("#txtGetItemPrice").val();

    let order = {
        oid: "",
        date: "",
        customerID: "",
        orderDetails: []
    };

    $('#order-table>tr').each(function () {
        let code = $(this).children().eq(0).text();
        let qty = $(this).children().eq(3).text();
        let price = $(this).children().eq(2).text();
        let orderDetails = {
            oid: orderId,
            code: code,
            qty: parseInt(qty),
            unitPrice: parseFloat(price)
        };

        order.orderDetails.push(orderDetails);
        orderDB.push(orderDetails);
    });

    order.oid = OId;
    order.date = date;
    order.customerID = cusId;
    orderDB.push(order);
};

$("#txtCash").on("keydown keyup input", function () {
    setBalance();
});

$("#txtDiscount").on("keydown keyup input", function (e){
    let total = parseFloat($("#txtTotal").text());
    if(total>0){
        let discount = $(this).val();
        let discountMoney = (total/100*discount);
        total -= discountMoney;
        $("#txtSubtotal").text(total);
    }

});

function setBalance() {
    let subtotal= $("#txtSubtotal").text();
    let cashText = $("#txtCash").val();
    let newSubtotal = parseFloat(subtotal);
    let cash = parseFloat(cashText);
    if (!isNaN(newSubtotal) && !isNaN(cash)) {
        let balance = cash - newSubtotal;
        $("#txtBalance").val(balance.toFixed(2));
    } else {
        $("#txtBalance").val("0");
    }
}
