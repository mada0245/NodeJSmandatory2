<script>
    import { goto } from '$app/navigation';
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
    <button class="button cancelButton" on:click={() => goto('/')}>Logout</button>
</div>