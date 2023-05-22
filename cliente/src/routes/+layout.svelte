<script>
    import Title from "../lib/title.svelte";
    //importing the global css
    import "../styles/global.css"

</script>


<style>
    header{
        display: flex;
        justify-content: center;
    }
    main{
        max-width: 960px;
        margin: 20px auto;
    }
    footer{
        text-align: center;
    }
    footer p{
        font-size: 10px;
    }
</style>


<!-- HTML -->
<header>
    <Title title="NodeJS M2"></Title>
</header>
<main>
    <!-- page content droped here-->
    <slot></slot>
</main>
<footer>
    <p>Project 2023</p>
</footer>