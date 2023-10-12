const ORDER_ID_REGEX = /^(OR00-)[0-9]{3}$/;

$("#txtOrderId").keyup(function (e) {

    let value = $("#txtOrderId").val();

    if (value.length == 0) {
        $("#txt").css('border', '1px solid #ced4da');

    } else {
        let res = ORDER_ID_REGEX.test(value);
        if (res) {
            $("#txtOrderId").css('border', '2px solid green');
        } else {
            $("#txtOrderId").css('border', '2px solid red');
        }
    }

});