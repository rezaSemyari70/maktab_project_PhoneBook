render_table();

function edit(id) {
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    contact = contactList.find(item => item.id = id);
    show_form();
    document.getElementById('id_id').value = contact.id;
    document.getElementById('id_name').value = contact.name;
    document.getElementById('id_lastname').value = contact.lastname;
    document.getElementById('id_phone').value = contact.phone;
    document.getElementById('id_email').value = contact.email;
    document.getElementById('id_address').value = contact.address;
    document.getElementById('id_birthday').value = contact.birthday;

}

function remove_contact(id) {
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    contactList = contactList.filter(item => item.id != id);
    localStorage.setItem('contactList', JSON.stringify(contactList));
    render_table();
}

function render_table() {
    const contactList = JSON.parse(localStorage.getItem('contactList'));
    if (!contactList) {
        localStorage.setItem('contactList', JSON.stringify([]))
        return;
    }
    const tbody2 = document.getElementsByTagName('tbody');
    if (tbody2.length > 0) {
        tbody2[0].remove();
    }

    const table = document.getElementById("contact_table");
    const tbody = document.createElement("TBODY");
    contactList.map(contact => {
        const tr = document.createElement("TR");
        tr.innerHTML =
            `<td class="text-center">${contact.id}</td><td class="text-center">${contact.name}</td><td class="text-center">${contact.lastname}</td><td class="text-center">${contact.phone}</td><td class="text-center">${contact.email}</td><td class="text-center">${contact.address}</td><td class="text-center">${contact.birthday}</td><td class="text-center"><button onclick="delete_contact(${contact.id})" class="btn deletBtn"><i
            class="fa fa-trash"></i></button> <button class="btn btn-primary" onclick="edit(${contact.id})"><i class="fa fa-edit"></i></button></td>`
        tbody.appendChild(tr);
    })
    table.appendChild(tbody);
}

function show_form() {
    const el = document.getElementById('form');
    el.classList.add("show");
}

function hide_form() {
    const el = document.getElementById('form');
    el.classList.remove("show");
}

document.getElementById("contact_form").addEventListener("submit", function (event) {
    event.preventDefault();
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    const new_contact_data = new FormData(document.querySelector('form'));
    let new_contact = {};
    for (let item of new_contact_data.entries()) {
        new_contact[item[0]] = item[1];
    }
    const contact = contactList.find(item => item.id == new_contact.id);
    if (contact) {
        contactList = contactList.map(item => item.id == new_contact.id ? new_contact : item);
    } else {
        contactList = [...contactList, new_contact];
    }

    localStorage.setItem('contactList', JSON.stringify(contactList));
    hide_form();
    render_table();
    event.target.reset();
});

function delete_contact(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            remove_contact(id);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}