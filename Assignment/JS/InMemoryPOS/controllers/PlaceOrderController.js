loadCustomerIDs();
$("#cusId").on("keyup", function () {
    let id=$("#cusId").val();
    for (let i = 0; i < customerDB.length; i++) {
       if (customerDB[i].id==id){
           let customerId=customerDB[i].id;
           let customerName=customerDB[i].name;
           let customerAddress=customerDB[i].address;
           let customerSalary=customerDB[i].salary;

           $("#txtCustomerName").val(customerName);
           $("#txtCustomerSalary").val(customerSalary);
           $("#txtCustomerAddress").val(customerAddress);
       }
    }
});
function loadCustomerIDs(){
    $("#cmbCustomer").empty();
    for (let i = 0; i <customerDB.length ; i++) {
        let id=customerDB[i].id;
        $("#cmbCustomer").append("<option >"+id +"</option>");
    }
}