<script>
    import { goto } from '$app/navigation';

    let username;
    let inputEmail;
    let inputPassword;
    let repeatPassword;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handleSubmit(){
        if(username && inputEmail && inputPassword && repeatPassword){
            if(emailFormat.test(inputEmail)){
                if(inputPassword == repeatPassword){
                if(inputPassword.length < 3){
                    alert("The password is too short");
                }else{
                    getToken();
                }
            }else{
                alert("the passwords do not match");
            }
            }else{
                alert("Please insert a valid email")
            }
        }else{
            alert("Please fill all information");
        }
    }


    let savedToken;

    async function getToken() {
       
       const url = 'http://localhost:8000/api/token/get';

       const response = await fetch(url, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           },
       });
       
       if (response.ok) {
           savedToken = await response.text();
           signUp(savedToken);
       } else {
           console.error('Error:', response.status, response.statusText);
           alert("Something went wrong");
       }
    }


    async function signUp(token) {
       
        const url = 'http://localhost:8000/api/signUp';
        const data = { name: username, email: inputEmail, password: inputPassword};

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(data)
        });
        
        
        if (response.ok) {
            const result = await response.text();
            console.log(result);
        } else {
            console.error('Error:', response.status, response.statusText);
            const result = await response.text();
            alert(result);
        }
        
    }
</script>



<style>

</style>


<!-- HTML -->
<div>
    <h1>
    <p class="title">SignUp Page</p>
    </h1>
    <h2>
    <p class="subtitle">Please insert the required information</p>
    </h2>
</div>


<div>
    <label for="username">Username:</label>
    <br>
    <input type="text" id="username" bind:value={username}><br><br>

    <label for="email">Email:</label>
    <br>
    <input type="text" id="email" bind:value={inputEmail}><br><br>

    <label for="password">Password:</label>
    <br>
    <input type="password" id="password" bind:value={inputPassword}><br><br>

    <label for="repeatPassword">Repeat Password:</label>
    <br>
    <input type="password" id="repeatPassword" bind:value={repeatPassword}><br><br>
</div>


<div>
    <button class="button confirmButton" on:click={handleSubmit}>Submit</button>
    <br>
    <br>
    <button class="button cancelButton" on:click={() => goto('/main')}>Back</button>
</div>