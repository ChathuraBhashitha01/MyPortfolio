
$(window).on('load',function (){
    $("#loader").fadeOut(1000);
});

$("#btnMessegeSend").click(function (){
    $("#txtSenderName,#txtSenderEmail,#txtSubject,#txtSenderMessege").val("")
    $("#txtSenderName").css("placeholder","Name")
    $("#txtSenderEmail").css("placeholder","Email")
    $("#txtSubject").css("placeholder","Subject")
    $("#txtSenderMessege").css("placeholder","Message")
});
