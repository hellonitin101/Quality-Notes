const API_URL = "http://localhost:5000/api/auth";


// SIGNUP
const signupForm = document.getElementById("signupForm");

if(signupForm){

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        try{

            const res = await fetch(`${API_URL}/signup`, {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    name,
                    email,
                    password
                })

            });

            const data = await res.json();

            if(res.ok){

                message.innerHTML = `
                    <div class="alert success">
                        Signup Successful
                    </div>
                `;

                setTimeout(() => {
                    window.location.href = "login.html";
                },1500);

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

}



// LOGIN
const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("message");

        try{

            const res = await fetch(`${API_URL}/login`, {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    email,
                    password
                })

            });

            const data = await res.json();

            if(res.ok){

                localStorage.setItem("token", data.token);

                localStorage.setItem("user", JSON.stringify(data.user));

                message.innerHTML = `
                    <div class="alert success">
                        Login Successful
                    </div>
                `;

                setTimeout(() => {
                    window.location.href = "dashboard.html";
                },1500);

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

}