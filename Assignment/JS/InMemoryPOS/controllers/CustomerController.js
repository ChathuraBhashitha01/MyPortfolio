getAllCustomer();
loadCustomerIDs();
$("#btnSaveCustomer").click(function (){
    if (checkAll()) {
        saveCustomer();
    }
    else {
        alert("Faild Saved");
    }
});

$("#btnCustomerGetAll").click(function (){
    getAllCustomer();
});

$("#btnCustomerDelete").click(function (){
    let id=$("#cusId").val();
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to Delete this customer.?");
        if (consent) {
            for (let i = 0; i < customerDB.length; i++) {
                if (customerDB[i].id == id) {
                    customerDB.splice(i, 1);
                    return true;
                }
            }
            loadCustomerIDs();
            getAllCustomer();
            clearAllField();
        }
    }
    return false;
});

$("#btnCustomerUpdate").click(function (){
    let id=$("#cusId").val();
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);

            let customerName = $("#cusName").val();
            let customerAddress = $("#cusAddress").val();
            let customerSalary = $("#cusSalary").val();

            customer.name = customerName;
            customer.address = customerAddress;
            customer.salary = customerSalary;

            getAllCustomer();
            clearAllField();
        }
    }
});

$("#btnCustomerSearch").click(function (){
    let id=$("#cmbCustomerID").val();
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id==id){
            $("#cusId").val(customerDB[i].id)
            $("#cusName").val(customerDB[i].name)
            $("#cusAddress").val(customerDB[i].address)
            $("#cusSalary").val(customerDB[i].salary)
        }
    }
});

function saveCustomer() {
    let customerId = $("#cusId").val();

    if (searchCustomer(customerId.trim()) == undefined){
        let customerName = $("#cusName").val();
        let customerAddress = $("#cusAddress").val();
        let customerSalary = $("#cusSalary").val();

        let newCustomer = Object.assign({}, customer);
        newCustomer.id = customerId;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        customerDB.push(newCustomer);
        clearCustomerInputField();
        loadCustomerIDs();
        getAllCustomer();
        clearAllField();
    }
    else {
        alert("Customer already exits.!");
        clearCustomerInputField();
    }
}

function searchCustomer(id){
    return customerDB.find(function (customer){
        return customer.id==id;
    });
}

function getAllCustomer(){
    $("#tblCustomer").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let customerId=customerDB[i].id;
        let customerName=customerDB[i].name;
        let customerAddress=customerDB[i].address;
        let customerSalary=customerDB[i].salary;

        let row=`<tr>
                    <td>${customerId}</td>
                    <td>${customerName}</td>
                    <td>${customerAddress}</td>
                    <td>${customerSalary}</td>
                </tr>`;
        $("#tblCustomer").append(row);
        bindTrEvents();
    }
}
function bindTrEvents() {
    $("#tblCustomer>tr").click(function (){
        let id=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let address=$(this).children().eq(2).text();
        let salary=$(this).children().eq(3).text();

        $("#cusId").val(id)
        $("#cusName").val(name)
        $("#cusAddress").val(address)
        $("#cusSalary").val(salary)
    });
}
function loadCustomerIDs(){
    $("#cmbCustomerID").empty();
    for (let i = 0; i <customerDB.length ; i++) {
        let id=customerDB[i].id;
        $("#cmbCustomerID").append("<option >"+id +"</option>");
    }
}
function clearAllField(){
    clearCustomerInputField();
}