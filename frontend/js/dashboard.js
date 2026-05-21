const user = JSON.parse(localStorage.getItem("user"));

if(!user){

    window.location.href = "login.html";

}

document.getElementById("welcomeText").innerText =
`Welcome, ${user.name}`;

document.getElementById("studentName").value = user.name;

document.getElementById("studentEmail").value = user.email;




// LOGOUT

function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}




// NOTES TYPE CUSTOM INPUT

const notesType =
document.getElementById("notesType");

const customNotesType =
document.getElementById("customNotesType");

notesType.addEventListener("change",()=>{

    if(notesType.value === "Other"){

        customNotesType.style.display = "block";

    }else{

        customNotesType.style.display = "none";

    }

});




// REQUEST FORM

const requestForm =
document.getElementById("requestForm");

requestForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const requestData = {

        studentName:
        document.getElementById("studentName").value,

        studentEmail:
        document.getElementById("studentEmail").value,

        course:
        document.getElementById("course").value,

        subject:
        document.getElementById("subject").value,

        notesType:

        document.getElementById("notesType").value === "Other"

        ? document.getElementById("customNotesType").value

        : document.getElementById("notesType").value,

        language:

document.getElementById("language").value === "Other"

? document.getElementById("customLanguage").value

: document.getElementById("language").value,

        deadline:
        document.getElementById("deadline").value,

        syllabus:
        document.getElementById("syllabus").value,

        extraInfo:
        document.getElementById("extraInfo").value

    };

    localStorage.setItem(

        "requestData",

        JSON.stringify(requestData)

    );

    window.location.href = "payment.html";

});