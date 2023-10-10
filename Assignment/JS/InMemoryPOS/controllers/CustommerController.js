getAllCustomer();

$("#btnSaveCustomer").click(function (){
    saveCustomer();
});

$("#btnGetAll").click(function (){
    getAllCustomer();
});

function saveCustomer(){
    let customerId=$("#cusId").val();
    let customerName=$("#cusName").val();
    let customerAddress=$("#cusAddress").val();
    let customerSalary=$("#cusSalary").val();

    let newCustomer=Object.assign({},customer);
    newCustomer.id=customerId;
    newCustomer.name=customerName;
    newCustomer.address=customerAddress;
    newCustomer.salary=customerSalary;

    customerDB.push(newCustomer);
    getAllCustomer();
}

function deleteCustomer(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id==id){
            customerDB.splice(i,1);
            return true;
        }
    }
    return false;
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
                    <td>${customerAddress}</td
                    <td>${customerSalary}</td>
                </tr>`;
        $("#tblCustomer").append(row);
    }
}