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

    let newCustomer=Object.assign({},customer)
    newCustomer.id=customerId;
    newCustomer.name=customerName;
    newCustomer.address=customerAddress;
    newCustomer.salary=customerSalary;

    customerDB.push(newCustomer);
}

function getAllCustomer(){
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
                </tr>`
        $("#tblCustomer").append(row);
    }
}