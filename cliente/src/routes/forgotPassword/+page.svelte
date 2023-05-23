<script>
    import { goto } from '$app/navigation';
       let inputEmail;
       const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function handleSend() {
        if(inputEmail && emailFormat.test(inputEmail)){
                
            const url = 'http://localhost:8000/api/forgotPassword';
            const data = { email: inputEmail };
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            
            if (response.ok) {
                alert(`An email has been sent to ${inputEmail}`);
                goto("/");
            } else {
                console.error('Error:', response.status, response.statusText);
                const result = await response.text();
                alert(result);
            }

        }else{
            alert("Please insert a valid email");
        }
    }
   </script>
   
   
   
   <style>
   
   </style>
   
   
   <!-- HTML -->
   <div>
       <h1>
           <p class="title">Forgot Password Page</p>
       </h1>
       <h2>
           <p class="subtitle">Please insert your email</p>
       </h2>
       <p class="notes">Email = admin@example.com</p>
       <p class="notes">SignUp a user with an email that you have access, for demonstration</p>
   </div>
   
   
   <div>
       <label for="email">Email:</label>
       <br>
       <input type="text" id="email" bind:value={inputEmail}><br><br>
   </div>
   
   
   <div>
        <button class="button confirmButton" on:click={handleSend}>Send</button>
        <br>
        <br>
       <button class="button cancelButton" on:click={() => goto("/")}>Back</button>
   </div>