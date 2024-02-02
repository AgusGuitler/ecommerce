let userReg = JSON.parse(localStorage.getItem('userReg')) || [];

let usersAdmin = JSON.parse(localStorage.getItem('usersAdmin')) || [];

//elements
//elements
let tableUsers = document.getElementById('tableUsers')

let tableUsersAdmin = document.getElementById('tableAdmins')

listUserRegister();
listUserAdmmin();


function listUserRegister(){
    tableUsers.innerHTML="";
    userReg.forEach(element => {
        tableUsers.innerHTML+=`
        <tr class="fs-5">
            <td class="">${element.nameUser}</td>
            <td class="">${element.emailUser}</td>
            <td class="d-md-grid row-gap-3">
                <button class="btn btn-warning mx-auto"href="#titulo" type="button"  onclick="assingAdmin('${element.nameUser}')">VOLVER ADMINISTRADOR</button>
                <button class="btn btn-danger mx-auto" type="button"  onclick="deleteDefault('${element.nameUser}')">BORRAR</button>
            </td>
        </tr>`
    });
}
function listUserAdmmin(){
  tableUsersAdmin.innerHTML="";
  usersAdmin.forEach(element => {
    if (element.emailUser === 'admin@example.com') {
        tableUsersAdmin.innerHTML += `
        <tr class="fs-5">
            <td class="">${element.nameUser}</td>
            <td class="">${element.emailUser}</td>
        </tr>`
    } else {
        tableUsersAdmin.innerHTML += `
        <tr class="fs-5">
            <td class="">${element.nameUser}</td>
            <td class="">${element.emailUser}</td>
            <td class="d-md-grid row-gap-3">
                <button class="btn btn-warning  mx-auto" href="#titulo" type="button"  onclick="assingDefault('${element.nameUser}')">VOLVER INVITADO</button>
                <button class="btn btn-danger mx-auto" type="button"  onclick="deleteAdmin('${element.nameUser}')">BORRAR</button>
            </td>
        </tr>`
        console.log("ingreso a else");
    }
});
}

window.assingAdmin = function(user){
 
    const userAddAdmin = userReg.find((element)=>
    {   
        return element.nameUser === user;
    })
    if (userReg.includes(userAddAdmin)){
        
        if (usersAdmin.includes(userAddAdmin)) {
            alert('Ya es admin')
        }
        else{
            userAddAdmin.admin = true;
            usersAdmin.push(userAddAdmin);
            localStorage.setItem('usersAdmin',JSON.stringify(usersAdmin));
            
            userReg = userReg.filter((element) => {
                return element.nameUser !== user;
                
            })
            localStorage.setItem('userReg',JSON.stringify(userReg));
            location.reload();
        }
        
    }
    
}
window.assingDefault = function(user){
 
    const userAddAdmin = usersAdmin.find((element)=>
    {   
        return element.nameUser === user;
    })
    if (usersAdmin.includes(userAddAdmin)){
        
        if (userReg.includes(userAddAdmin)) {
            alert('Ya es invitado')
        }
        else{
            userAddAdmin.admin = false;
            userReg.push(userAddAdmin);
            localStorage.setItem('userReg',JSON.stringify(userReg));
            
            usersAdmin = usersAdmin.filter((element) => {
                return element.nameUser !== user;
                
            })
            localStorage.setItem('usersAdmin',JSON.stringify(usersAdmin));
            location.reload();
        }
        
    }
    
}

window.deleteAdmin = function(user){
    const userAdmin = usersAdmin.filter((element)=>
        element.nameUser !== user
    )
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            usersAdmin = userAdmin
            localStorage.setItem('usersAdmin',JSON.stringify(usersAdmin))
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

}
window.deleteDefault = function(user){
    const userDefault = userReg.filter((element)=>
        element.nameUser !== user)

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        userReg = userDefault
        localStorage.setItem('userReg',JSON.stringify(userReg))

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          })
          setTimeout(()=>{
            location.reload();
          },1000)
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

    

}
