loadCustomerIDs();
loadItemsCodes();
genarateOrderIDs();
removeTableItems();
setCurrentDate();

$("#navPlaceOrder").click(function (){
    loadCustomerIDs();
    loadItemsCodes();
});

$("#btnPurchase").click(function (){
    placeOrder();
    clearPlaceOrderInputField();
    genarateOrderIDs();
    setCurrentDate();
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
        if (id == check){
            $(this).children().eq(1).text(name);
            $(this).children().eq(2).text(price);
            $(this).children().eq(3).text(qty);
            $(this).children().eq(4).text(qty * price);
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
    if(searchOrder(orderId.trim()) == undefined){
        let cusId=$("#cmbCustomer").val();
        let date=$("#txtDate").val();
        let itemName=$("#txtGetItemName").val();
        let itemQtyOnHand=$("#txtGetQtyOnHand").val();

        let code=0;
        let qty=0;
        let price=0;
        $('#tblPlaceOrder>tr').each(function () {
             code = $(this).children().eq(0).text();
             qty = $(this).children().eq(3).text();
             price = $(this).children().eq(2).text();

        });

       let orderDetail= orderDetails={
            oid: orderId,
            code: code,
            qty:  qty,
            unitPrice:  price
        };

       let purchaseOrder= order={
            oid:orderId,
            date:date,
            customerID:cusId,
            orderDetails: orderDetail
        }

        let item = searchItem(code);
        item.description=itemName;
        item.unitPrice=price;
        item.qtyOnHand=(itemQtyOnHand-qty);

        let isSaved=orderDB.push(purchaseOrder);
        console.log(orderDB);
        console.log(isSaved);
    }
    else {
        alert("Order id already exits.!");
        clearCustomerInputField();
    }
};
function searchOrder(id){
    return orderDB.find(function (order){
        return order.oid==id;
    });
}

$("#txtCash").on("keydown keyup input", function () {
    setBalance();
});

$("#txtDiscount").on("keydown keyup input", function (e){
    let total = $("#txtTotal").text();
    let cash=$("#txtCash").text();
    if(total>0){
        let discount = $(this).val();
        let discountMoney = (total/100*discount);
        total -= discountMoney;
        let balance=cash-total;
        $("#txtSubtotal").text(total);
        setBalance();
    }

});

function setBalance() {
    let subtotal= $("#txtSubtotal").text();
    let cashText = $("#txtCash").val();
    if (!isNaN(cashText)) {
        let balance = cashText - subtotal;
        $("#txtBalance").val(balance);
    } else {
        $("#txtBalance").val("0");
    }
}

let idCounts=1;
function genarateOrderIDs(){
    if (orderDB.length==0){
        $("#txtOrderId").val("OR00-001");
    }else {
        if (orderDB.length > 0) {
            idCounts++;
            $("#txtOrderId").val("OR00-00" + idCounts);
        }
        if (orderDB.length >= 10) {
            idCounts++;
            $("#txtOrderId").val("OR00-0" + idCounts);
        }
        if (orderDB.length >= 100) {
            idCounts++;
            $("#txtOrderId").val("OR00-" + idCounts);
        }
    }
}
function removeTableItems(){
    $('#tblPlaceOrder>tr').on("dblclick",function (){
        $('#tblPlaceOrder>tr').remove();
    });
}
function setCurrentDate(){
    let currentdate = new Date();
    let date =currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear();
    $("#txtDate").val(date);
}