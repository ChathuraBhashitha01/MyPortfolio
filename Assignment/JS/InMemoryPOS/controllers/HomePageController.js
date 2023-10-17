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
    setView($("#customerPage"));
    $("#navCustomer").css( "font-weight","bold");
    $("#navPlaceOrder").css( "font-weight","normal");
    $("#navHome").css( "font-weight","normal");
    $("#navItem").css( "font-weight","normal");
});

$("#imgItem").click(function (){
    setView($("#itemPage"))
    $("#navCustomer").css( "font-weight","normal");
    $("#navPlaceOrder").css( "font-weight","normal");
    $("#navHome").css( "font-weight","normal");
    $("#navItem").css( "font-weight","bold");
});

$("#imgPlaceOrder").click(function (){
    setView($("#placeOrderPage"))
    $("#navCustomer").css( "font-weight","normal");
    $("#navPlaceOrder").css( "font-weight","bold");
    $("#navHome").css( "font-weight","normal");
    $("#navItem").css( "font-weight","normal");
    $("#btnOrderDetails").css('display','block');
    $("#frmOrderDetails").css('display','none');
});


