/* What we want im this project ?? and som cookies from it ! */
1.// getTotal()
// ---> input.onkeyup = `getTotal()`

2.// createProduct()
// ---> to create thing from data you want saving this data
// ---> beast place to saving data is Array
// ---> first create object have these data 
// ---> second push this object into array

3.// local storage save
// ---> localStorage.setItem(`product`, JSON.stringify(dataPro))
// ---> `product` is a new item in localStorage 
// ---> `product` value : JSON.stringify(dataPro) not dataPro >> value must be STRING
// ---> JSON.stringify(dataPro) is HANDLING dataPro elements as a STRING
// -- but when reloading page data will be clear !!
// ---> because you want saving this data as elements in array
// ---> dataPro = JSON.parse(localStorage.product) : by using this code 

4.// clearInputs()

5.// showData()
// ---> first calling tbody and set .innerHtml = new variable [table]
// ---> second for loop : table += ` <tr>${ dataPro[i].element }</tr> `
// ---> finally calling this function when we click create & when page start

7.// deleteData() 
// ---> splicing element from array ; refresh array on localStorage ; showData()

8.// deleteAll
// ---> if dataPro have not elements show deleteAll button
// ---> onclick = do the same idea of delete button with using dataPro.length > 0

9.// counting
// ---> if count < 1 make for loop to create elements with count value
// ---> else .. create one element

9.// update()
// ---> 1. changing all values to your element[object] value
// ---> 2. let mood = create & let mood = update
// ---> 3. create will doing normal submit but update making dataPto[i]= newPro
// ---> 4. but i is not global variable to using it out of his function
// ---> 5. so create global variable : shadowVariable = i and use it

10.// searchData()

/* LETS GOO !! */

let title = document.getElementById(`title`)
let price = document.getElementById(`price`)
let taxes = document.getElementById(`taxes`)
let ads = document.getElementById(`ads`)
let discount = document.getElementById(`discount`)
let total = document.getElementById(`total`)
let count = document.getElementById(`count`)
let category = document.getElementById(`category`)
let submit = document.getElementById(`submit`)
let search = document.getElementById(`search`)
let searchByTitle = document.getElementById(`searchByTitle`)
let searchByCategory = document.getElementById(`searchByCategory`)
let deleteAllDiv= document.getElementById(`deleteAll`)
let deleteAll= document.createElement(`button`)
deleteAll.innerHTML=`Delete All`

let mood = `create`
let shadowVariable;

let searchMood = `title`;



function getTotal() {
    if (price.value != ``) {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML= result 
    } else { total.innerHTML=`` }
    if (total.innerHTML!=``) {
        total.style.backgroundColor= `green`
    } else { total.style.backgroundColor= `crimson` }
}

let dataPro
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

function clearInputs() {
    title.value=``
    price.value=``
    taxes.value=``
    ads.value=``
    discount.value=``
    total.innerHTML=``
    total.style.backgroundColor= `crimson` 
    count.value=``
    category.value=``
}

submit.onclick = ()=> {
    newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (mood === `create`) {
        if (newPro.count>1){
            for(i=0;i<newPro.count;i++){
                dataPro.push(newPro)
            }
        } else {
            dataPro.push(newPro)
        }
    } else {
        dataPro[shadowVariable]=newPro;
        mood= `create`;
        submit.innerHTML=`create`;
        count.style.display=`block`;
    }
    localStorage.setItem(`product`, JSON.stringify(dataPro))
    clearInputs();
    showData();  
}
showData();  

function showData() {
    let table =``;
    for (i=0;i<dataPro.length;i++) {
        table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="update">delete</button></td>
                    </tr>
        `
    }
    document.getElementById(`tbody`).innerHTML= table;

    if (dataPro.length>0){
        deleteAllDiv.appendChild(deleteAll)
        deleteAll.innerHTML=`Delete All (${dataPro.length})`
    } else { deleteAll.remove() }
    deleteAll.onclick = ()=> {
        dataPro.length=0
        localStorage.product = JSON.stringify(dataPro)
        showData()
    }
}

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function updateData(i){
    title.value = dataPro[i].title;
    taxes.value = dataPro[i].taxes;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display=`none`;
    category.value= dataPro[i].category;
    submit.innerHTML=`Update`;
    mood = `update`;
    shadowVariable=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    showData()
}

function searching(i) {
    if (i === `searchByTitle`) {
        searchMood= `title`
        search.placeholder = `Search By Title`
    } else {
        searchMood= `category`
        search.placeholder = `Search By Category`
    }
    search.focus()
    search.value=``
    showData()
}

function searchData(value) {
    let table =``;
    if (searchMood === `title`) {
        for(i=0;i<dataPro.length;i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="update">delete</button></td>
                    </tr>
        `
            }
        }
    } else {
        for(i=0;i<dataPro.length;i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="update">delete</button></td>
                    </tr>
        `
            }
        }
    }
    document.getElementById(`tbody`).innerHTML= table;
}



