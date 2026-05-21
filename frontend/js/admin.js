const API_URL = "https://quality-notes.onrender.com/api/request";


// ADMIN PASSWORD
const ADMIN_PASSWORD = "Nitin@2009";


// CHECK LOGIN
if(localStorage.getItem("adminAccess") === "true"){

    showAdminPanel();

}



// CHECK PASSWORD
function checkAdminPassword(){

    const password =
    document.getElementById("adminPassword").value;

    const loginMessage =
    document.getElementById("loginMessage");

    if(password === ADMIN_PASSWORD){

        localStorage.setItem("adminAccess","true");

        showAdminPanel();

    }else{

        loginMessage.innerHTML = `
            <div class="alert error">
                Wrong Admin Password
            </div>
        `;

    }

}



// SHOW ADMIN PANEL
function showAdminPanel(){

    document.getElementById("adminLoginBox")
    .style.display = "none";

    document.getElementById("adminPanel")
    .style.display = "block";

    loadRequests();

}



// LOAD REQUESTS
async function loadRequests(){

    try{

        const res = await fetch(`${API_URL}/all`);

        const requests = await res.json();

        const tableBody =
        document.getElementById("requestTableBody");

        tableBody.innerHTML = "";

        requests.forEach((request)=>{

            tableBody.innerHTML += `

            <tr>

                <td>
                    ${request.studentName}
                    <br>
                    ${request.studentEmail}
                </td>

                <td>
                    ${request.subject}
                </td>

                <td>
                    ${request.notesType}
                </td>

                <td>
                    ₹${request.price}
                </td>

                <td>

                    <span class="status
                    ${request.status === "Completed"
                    ? "completed"
                    : "pending"}">

                    ${request.status}

                    </span>

                </td>

                <td>

                    <input
                        type="file"
                        accept=".pdf"
                        id="pdf-${request._id}"
                    >

                    <button
                        class="btn"
                        style="margin-top:10px;"
                        onclick="uploadPDF('${request._id}')"
                    >
                        Upload
                    </button>

                </td>

            </tr>

            `;

        });

    }catch(error){

        console.log(error);

    }

}



// UPLOAD PDF
async function uploadPDF(id){

    const fileInput =
    document.getElementById(`pdf-${id}`);

    const file = fileInput.files[0];

    if(!file){

        alert("Please select PDF");

        return;

    }

    const formData = new FormData();

    formData.append("pdf", file);

    try{

        const res = await fetch(
            `${API_URL}/upload/${id}`,
            {
                method:"PUT",
                body:formData
            }
        );

        const data = await res.json();

        if(res.ok){

            alert("PDF Uploaded Successfully");

            loadRequests();

        }else{

            alert(data.message);

        }

    }catch(error){

        console.log(error);

    }

}



// LOGOUT
function adminLogout(){

    localStorage.removeItem("adminAccess");

    window.location.reload();

}