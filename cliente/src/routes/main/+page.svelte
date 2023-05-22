<script>
    import { goto } from '$app/navigation';


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
           goto("/");
       } else {
           console.error('Error:', response.status, response.statusText);
       }
}
</script>



<style>

</style>


<!-- HTML -->
<div>
    <h1>
    <p class="title">Main Page</p>
    </h1>
    <h2>
    <p class="subtitle">Please choose an option</p>
    </h2>
</div>


<div>
    <button class="button confirmButton" on:click={() => goto('/main/signUp')}>Sign up</button>
    <br>
    <br>
    <button class="button cancelButton" on:click={resetTokens}>Logout</button>
</div>