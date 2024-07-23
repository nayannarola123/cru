let productName = document.getElementById("proName");
let price = document.getElementById("price");
let tbody = document.getElementById("data");

let isEdit = false;
let isIndex;

// add data
const getData = () => {
    let data = JSON.parse(localStorage.getItem('product') || '[]');
    console.log("data", data);
    return data;
}

let storage = getData();

const formData = () => {
    event.preventDefault();

    let productData = {
        id: isIndex ? isIndex : Math.floor(Math.random() * 100 + 1),
        name: productName.value,
        price: price.value,
    }

    if (isEdit) {
        let updateData = [...storage];

        const update = updateData.map((rec) => {
            if (rec.id == isIndex) {
                return productData;
            } else {
                return rec;
            }
        })
        storage = update;

        isEdit = false;
        isIndex = undefined;
    } else {
        storage = [...storage, productData];
        // console.log(productData);
    }

    productName.value = "";
    price.value = "";

    localStorage.setItem('product', JSON.stringify(storage));

    viewData();
}

// view data
const viewData = () => {

    tbody.innerHTML = "";

    storage.forEach((rec) => {
        tbody.innerHTML += `<tr>
                                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                        ${rec.id}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                        ${rec.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        ${rec.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onclick="return editData(${rec.id})">
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button class="font-medium text-red-600 dark:text-red-500 hover:underline" onclick="return deleteData(${rec.id})">
                                        <i class="bi bi-trash3"></i>
                                        </button>
                                    </td>
                                </tr>`
    });

}
viewData();

// edit data
const editData = (id) => {
    // console.log(id);
    let data = [...storage];

    let singleRec = data.filter((rec) => {
        return rec.id == id;
    })

    productName.value = singleRec[0].name;
    price.value = singleRec[0].price;

    isEdit = true;
    isIndex = id;
}

const deleteData = (id) => {

    let record = [...storage];

    let delRec = record.filter((rec) => {
        return rec.id != id;
    })

    localStorage.setItem('product', JSON.stringify(delRec));
    storage = getData();
    viewData();
}