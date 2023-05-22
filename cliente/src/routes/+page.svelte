<script>
 import { goto } from '$app/navigation';
    let username;
    let inputPassword;

    async function resetTokens() {
       
            const url = 'http://localhost:8000/api/token/delete';
    
            const response = await fetch(url, {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            
            if (response.ok) {
                const result = await response.text();
                console.log(result);
            } else {
                console.error('Error:', response.status, response.statusText);
            }
    }

    resetTokens();

  async function redirectToMainPage() {
        if(username && inputPassword){
                
            const url = 'http://localhost:8000/api/login';
            const data = { name: username, password: inputPassword};
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            
            if (response.ok) {
                const result = await response.text();
                saveToken(result);
            } else {
                console.error('Error:', response.status, response.statusText);
                alert("Wrong Credetials");
            }

        }else{
            alert("Wrong Credetials");
        }
    }



    async function saveToken(token) {

        const url = 'http://localhost:8000/api/token/add';
        const data = { token};

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        
        if (response.ok) {
            goto('/main');
        } else {
            console.error('Error:', response.status, response.statusText);
            alert("Failed to send token");
        }
    }
</script>



<style>

</style>


<!-- HTML -->
<div>
    <h1>
        <p class="title">Login Page</p>
    </h1>
    <h2>
        <p class="subtitle">Please insert your credentials</p>
    </h2>
    <p class="notes">Username = admin</p>
    <p class="notes">Password = pass</p>
</div>


<div>
    <label for="username">Username:</label>
    <br>
    <input type="text" id="username" bind:value={username}><br><br>

    <label for="password">Password:</label>
    <br>
    <input type="password" id="password" bind:value={inputPassword}><br><br>
</div>


<div>
    <button class="button confirmButton" on:click={redirectToMainPage}>Login</button>
    <br>
    <br>
    <a href="/forgotPassword">Forgot Password ? Click me</a>
    <br>
    <br>
</div>