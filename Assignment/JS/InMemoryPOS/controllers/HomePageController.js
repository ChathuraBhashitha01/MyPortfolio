initiateUI();

$("#btnOrderDetails").css('display','none');

$("#navHome").css( "font-weight","bold");

$("#navHome").click(function (){
    $("#navCustomer").css( "font-weight","normal");
    $("#navPlaceOrder").css( "font-weight","normal");
    $("#navHome").css( "font-weight","bold");
    $("#navItem").css( "font-weight","normal");
    $("#btnOrderDetails").css('display','none');
});

function initiateUI(){
    clearAll();
    $("#homePage").css('display','block');
}

function clearAll(){
    $("#homePage,#customerPage,#itemPage,#placeOrderPage").css('display','none');
}

function setView(viewOb){
    clearAll();
    viewOb.css('display','block');
}
$("#navHome").click(function (){
    setView($("#homePage"))
});

$("#navCustomer").click(function (){
   setView($("#customerPage"))
});

$("#navItem").click(function (){
    setView($("#itemPage"))
});

$("#navPlaceOrder").click(function (){
    setView($("#placeOrderPage"))
});

$("#imgCustomer").click(function (){
    setView($("#customerPage"))
});

$("#imgItem").click(function (){
    setView($("#itemPage"))
});

$("#imgPlaceOrder").click(function (){
    setView($("#placeOrderPage"))
});


