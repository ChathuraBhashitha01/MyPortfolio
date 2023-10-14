loadCustomerIDs();
loadItemsCodes();
genarateOrderIDs();

setCurrentDate();

$("#navPlaceOrder").click(function (){
    loadCustomerIDs();
    loadItemsCodes();
    $("#navPlaceOrder").css( "font-weight","bold")
    $("#navCustomer").css( "font-weight","normal")
    $("#navItem").css( "font-weight","normal")
    $("#navHome").css( "font-weight","normal")
    $("#btnOrderDetails").css('display','block');
    $("#frmOrderDetails").css('display','none');
});

$("#btnOrderDetails").click(function (){
    $("#frmOrderDetails").css('display','block');
    loadOrderIDs();
});

$("#btnOrderDetailBack").click(function (){
    $("#frmOrderDetails").css('display','none');
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

    let alreadyAddedId=$('#tblPlaceOrder>tr').children().eq(0).text();
    if (id==alreadyAddedId){
        $('#tblPlaceOrder>tr').each(function () {
            $(this).children().eq(0).text(id);
            $(this).children().eq(1).text(name);
            $(this).children().eq(2).text(price);
            $(this).children().eq(3).text(qty);
            $(this).children().eq(4).text(qty * price);
        });
    }else {
        let row = `<tr>
                 <td>${id}</td>
                 <td>${name}</td>
                 <td>${price}</td>
                 <td>${qty}</td>
                 <td>${total}</td>
                </tr>`;

        $("#tblPlaceOrder").append(row);
    }
    $('#tblPlaceOrder>tr').each(function () {
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
        let orderDetailArray=[];

        $('#tblPlaceOrder>tr').each(function () {
             code = $(this).children().eq(0).text();
             qty = $(this).children().eq(3).text();
             price = $(this).children().eq(2).text();

            let orderDetail= orderDetails={
                oid: orderId,
                code: code,
                qty:  qty,
                unitPrice:  price
            };
            orderDetailArray.push(orderDetail)
        });

       let purchaseOrder= order={
            oid:orderId,
            date:date,
            customerID:cusId,
            orderDetails: orderDetailArray
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

$('#tblPlaceOrder>tr').click(function () {
    $('#tblPlaceOrder>tr').remove();
});

function setCurrentDate(){
    let currentdate = new Date();
    let date =currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear();
    $("#txtDate").val(date);
}

function loadOrderIDs(){
    $("#cmbOrderID").empty();
    for (let i = 0; i <orderDB.length ; i++) {
        let id=orderDB[i].oid;
        $("#cmbOrderID").append("<option >"+id +"</option>");
    }
}
$("#cmbOrderID").change(function () {
    let orderID=$("#cmbOrderID").val();
    $("#tblOrderDetails>tr").remove();
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].oid==orderID) {
            let date = orderDB[i].date;
            let id = orderDB[i].customerID;

            $("#txtOrderDate").val(date);
            $("#txtCustomer").val(id);

            for (let j = 0; j < orderDB[i].orderDetails.length; j++) {
                let code = orderDB[i].orderDetails[j].code;
                let qty = orderDB[i].orderDetails[j].qty;
                let price = orderDB[i].orderDetails[j].unitPrice;

                let row = `<tr>
                    <td>${orderID}</td>
                    <td>${code}</td>
                    <td>${qty}</td>
                    <td>${price}</td>
                    </tr>`
                $("#tblOrderDetails").append(row);
            }
        }
    }
});