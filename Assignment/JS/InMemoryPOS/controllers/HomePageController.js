initiateUI();

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


