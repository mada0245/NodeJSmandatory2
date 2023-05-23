<script>
    import { goto } from '$app/navigation';
    import { CheckLogin } from '$lib/privateRoutes';
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
        
    onMount(() => {
        toast.success("This is a toast example");
    })

    CheckLogin();
</script>



<style>

</style>


<!-- HTML -->
<Toaster />

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