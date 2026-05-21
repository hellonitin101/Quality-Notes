const requestData = JSON.parse(localStorage.getItem("requestData"));

const user = JSON.parse(localStorage.getItem("user"));

if(!requestData || !user){
    window.location.href = "dashboard.html";
}


const API_URL = "https://quality-notes.onrender.com/api/request";


// PRICE LOGIC
let price = 5;

if(!user.firstRequestUsed){
    price = 1;
}

document.getElementById("priceText").innerHTML =
`Amount To Pay: ₹${price}`;



// PAYMENT BUTTON
document.getElementById("paymentBtn")
.addEventListener("click", async ()=>{

    const message = document.getElementById("message");

    try{

        const res = await fetch(`${API_URL}/create`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                ...requestData,

                price,
                paymentStatus:"Paid"

            })

        });

        const data = await res.json();

        if(res.ok){

            localStorage.removeItem("requestData");

            message.innerHTML = `
                <div class="alert success">
                    Request Submitted Successfully
                </div>
            `;

            setTimeout(()=>{

                window.location.href = "dashboard.html";

            },2000);

        }else{

            message.innerHTML = `
                <div class="alert error">
                    ${data.message}
                </div>
            `;

        }

    }catch(error){

        message.innerHTML = `
            <div class="alert error">
                Server Error
            </div>
        `;

    }

});