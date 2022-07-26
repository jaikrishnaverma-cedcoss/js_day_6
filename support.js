let arr = [{ "Company": "Samsung", "Model": "Galaxy", "Memory(GB)": "64", "Price(Rs)": "15000","Quantity":"50","Rating":"5" }, { "Company": "Nokia", "Model": "S703", "Memory(GB)": "128", "Price(Rs)": "22000","Quantity":"20","Rating":"5" }, { "Company": "Xiaomi", "Model": "Note", "Memory(GB)": "32", "Price(Rs)": "12000","Quantity":"23","Rating":"5" }, { "Company": "Motoroala", "Model": "G10", "Memory(GB)": "32", "Price(Rs)": "15000","Quantity":"20","Rating":"5" }, { "Company": "Apple", "Model": "S12", "Memory(GB)": "64", "Price(Rs)": "25000","Quantity":"20","Rating":"5"  }];

defaulted();
function defaulted() {
    var tmp = "";
    var datat;
    for (var j = 0; j < arr.length; j++) {
        datat = arr[j]["Company"] + " " + arr[j]["Model"];

        tmp += '<option value="' + datat + '" id="' + j + '">' + datat + '</option>';
    }
    document.getElementById("product").innerHTML = tmp;
    document.getElementById("prd").innerHTML = tmp;
    document.getElementById("prd1").innerHTML = tmp;

    var head = "<tr>";
    for (const headings in arr[0]) {
        head += "<td>" + headings + "</td>";
    }
    head += "<td>Action</td></tr>";
    document.getElementById('thead').innerHTML = head;
    // now for body
    for (var i = 0; i < arr.length; i++) {
        addRow(arr[i]);
    }

}
function addRow(arr, tbody = "tbody") {

    var body = "<tr>";
    for (var key in arr) {
        var value = arr[key];
        body += "<td>" + value + "</td>";
    }
    // for (const [key, value] of Object.entries(arr)) {
    //     body += "<td>" + value + "</td>";
    // }
    if (tbody == "tbody")
        body += "<td><input type='checkbox' onchange='checkbox(this)'><td>";
    body += "</tr>";
    document.getElementById(tbody).innerHTML += body;
}
function searching() {
    var txtvalue = document.getElementById("input").value;
    var sltvalue = document.getElementById("select").value;

    if (sltvalue == "-1") {
        alert("Please select a column to search.");

        document.getElementById('tbody').innerHTML = "";
        defaulted();
    }
    else {

        document.getElementById('tbody').innerHTML = "";
        for (i = 0; i < arr.length; i++) {
            if (arr[i][sltvalue] == txtvalue) {

                addRow(arr[i]);

            }
        }
        if (document.getElementById('tbody').innerHTML == "") {
            var txt = '<tr><td colspan="4" style="text-align:center;color:red;font-weight:600"> No Record Found </td></tr>';
            document.getElementById('tbody').innerHTML = txt;
        }

    }


}
function sorting() {
    var sort = document.getElementById('sort').value;
    var sort_by = document.getElementById('sort_by').value;
    if (sort_by == "-1")
        sort_by = "Company";
    if (sort == "asc") {
        if (sort_by == "Company" || sort_by == "Model")
            arr = arr.sort(function (a, b) { let x = a[sort_by].toLowerCase(); let y = b[sort_by].toLowerCase(); if (x < y) { return -1; } if (x > y) { return 1; } return 0; });

        if (sort_by == "Memory(GB)" || sort_by == "Price(Rs)")
            arr = arr.sort(function (a, b) { return a[sort_by] - b[sort_by] });

    }
    if (sort == "dec") {
        if (sort_by == "Company" || sort_by == "Model")
            arr = arr.sort(function (a, b) { let x = a[sort_by].toLowerCase(); let y = b[sort_by].toLowerCase(); if (x < y) { return 1; } if (x > y) { return -1; } return 0; });

        if (sort_by == "Memory(GB)" || sort_by == "Price(Rs)")
            arr = arr.sort(function (a, b) { return b[sort_by] - a[sort_by] });
    }

    document.getElementById('tbody').innerHTML = "";
    for (var i = 0; i <arr.length; i++) {
        addRow(arr[i]);
    }


}
function add() {
    var company = document.getElementById('company').value;

    var model = document.getElementById('model').value;

    var memory = document.getElementById('memory').value;

    var price = document.getElementById('price').value;
    var quantity= document.getElementById('quantityin').value;
    var data = { "Company": company, "Model": model, "Memory(GB)": memory, "Price(Rs)": price,"Quantity":quantity };
    arr.splice(2, 0, data);
    document.getElementById('tbody').innerHTML = "";
    defaulted();
    document.getElementById('company').value = ""; document.getElementById('model').value = ""; document.getElementById('memory').value = ""; document.getElementById('price').value = "";document.getElementById('quantityin').value = "";

}

// Q5
var buyerList = [];


function addList() {
    var prod = document.getElementById("product");
    var pid = prod.options[prod.selectedIndex].id;
    prod = prod.value;
    var tmp2;
    var quant = document.getElementById("quantity").value;
    if(quant=="")
    {
        return alert("enter valid quantity.");
    }
    else
    {
        arr[pid]['Quantity']=parseInt(arr[pid]['Quantity']);
        quant=parseInt(quant);
        arr[pid]['Quantity']-=quant;
       console.log(arr[pid]['Quantity']+" "+quant);
        if( arr[pid]['Quantity']<0)
        {
            arr[pid]['Quantity']=arr[pid]['Quantity']+quant;
            // console.log(arr[pid]['Quantity']);
            return alert("Sorry "+quant+" Quantitiy Not Availabel for "+arr[pid]['Model']+" product");
        }
        if(quant<0)
           return alert("Quantity Cannot be negative.");
      
    }
    // console.log("");
    if (buyerList.length > 0) {
        var flag = 0;
        for (var x = 0; x < buyerList.length; x++) {
            // console.log(buyerList[x].Description == prod);
            if (buyerList[x].Description == prod) {

                buyerList[x].Quantity = parseInt(buyerList[x].Quantity);
                quant = parseInt(quant);
                buyerList[x].Quantity += quant;
                buyerList[x].Amount = arr[pid]['Price(Rs)'] * buyerList[x].Quantity;
                flag++;
            }
            // else if(x==buyerList.length-1 && flag==0)
            //  tmp2 = { Description: prod, Quantity: quant, Amount: (arr[pid]['Price(Rs)'] * quant) };
            //   buyerList.push(tmp2);
        }
        if (flag == 0) {
            tmp2 = { Description: prod, Quantity: quant, Amount: (arr[pid]['Price(Rs)'] * quant) };
            buyerList.push(tmp2);
        }


    } else {
        tmp2 = { Description: prod, Quantity: quant, Amount: (arr[pid]['Price(Rs)'] * quant) };
        buyerList.push(tmp2);
    }


    document.getElementById('ttbody').innerHTML = "";
    var head = "<tr>";
    for (const headings in buyerList[0]) {
        head += "<td>" + headings + "</td>";
    }
    head += "</tr>";
    document.getElementById('tthead').innerHTML = head;
    for (var i = 0; i < buyerList.length; i++) {
        addRow(buyerList[i], "ttbody");
        // console.log(buyerList[i].Amount);
        // console.log(buyerList);
    }
document.getElementById('h3').innerText="Cart";
document.getElementById('tbody').innerHTML = "";
defaulted();

}
function generateBill() {
    var total = 0;
    document.getElementById('ttbody').innerHTML = "";
    var head = "<tr>";
    for (const headings in buyerList[0]) {
        head += "<td>" + headings + "</td>";
    }
    head += "</tr>";
    document.getElementById('tthead').innerHTML = head;
    for (var i = 0; i < buyerList.length; i++) {
        addRow(buyerList[i], "ttbody");
        total += parseInt(buyerList[i].Amount);
        // console.log(buyerList[i].Amount);
        // console.log(buyerList);
    }
    var totalx = "<tr><td colspan='2'>Total</td><td>" + total + "</td></tr>";
    document.getElementById('ttbody').innerHTML += totalx;
    document.getElementById('h3').innerText="Bill";
}

// Q6
var hold = [];
function checkbox(checkbx) {
    var td = checkbx.closest('td')
    var tr = td.closest('tr');


    let nodes = Array.from(tr.closest('tbody').children);
    let index = nodes.indexOf(tr);
    if (hold.includes(index)) {
        tr.style.color = "black";
        tr.style.fontWeight = "400";
        var indexExist = hold.indexOf(index);
        hold.splice(indexExist, 1);

    }
    else {
        tr.style.color = "red";
        tr.style.fontWeight = "700";
        hold.push(index);
    }

    //    arr.splice(index, 1);

    console.log(hold);

}

function delete_list() {
     if (confirm("Do you want to Delete all selected products?")) {
        for (var index = 0; index < hold.length; index++) {
            console.log(hold[index]);
            arr[hold[index]] = null;
             }
        arr = arr.filter((x)=> (x != null));
        // function isnull(x) {return;
        // // }
        // console.log(arr);

    } else {
        console.log("delete cancelled.")
    }
    document.getElementById('tbody').innerHTML = "";
    defaulted();
    hold.splice(0, hold.length);
}
function updateQuantity()
{
    var prod = document.getElementById("prd");
    var qnt = document.getElementById("inputqnt").value;
    var pid = prod.options[prod.selectedIndex].id;
    // var dd=parseInt(arr[pid].Quantity);
    arr[pid].Quantity=qnt;
    document.getElementById('tbody').innerHTML="";
    defaulted();
}
function rating()
{
    var prod = document.getElementById("prd1");
    var rate = document.getElementById("rate").value;
    var pid = prod.options[prod.selectedIndex].id;
    arr[pid].Rating=rate;
    document.getElementById('tbody').innerHTML="";
    defaulted();
}