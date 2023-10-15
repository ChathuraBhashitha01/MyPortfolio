const Email_REGEX = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
const NAME_REGEX = /^[A-Za-z ]{1,}$/;

let portfolioRegex=new Array();

portfolioRegex.push({field:$("#txtSenderName"),regEx:NAME_REGEX});
portfolioRegex.push({field:$("#txtSenderEmail"),regEx:Email_REGEX});

$("#txtSenderName,#txtSenderEmail").on("keydown keyup", function (e) {
    let indexNo = portfolioRegex.indexOf(portfolioRegex.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidation(portfolioRegex[indexNo]);
});

function checkValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object);
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol,object){
    if(!bol){
        if (object.field.val().length >= 1) {
            object.field.css("color", "red");
        }
    }
    else {
        if (object.field.val().length >= 1) {
            object.field.css("color", "white");
        }
    }
}

