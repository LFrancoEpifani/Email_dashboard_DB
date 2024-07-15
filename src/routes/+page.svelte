<script>
    import Header from '../components/Header.svelte';
    import Inbox from '../components/Inbox.svelte';
    import './app.css';


    let darkMode = false;

function toggleDarkMode() {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
}

</script>
<div class="relative">
    <div class="bg-bg_gradient opacity-90">
       <div class="">
        <Header {toggleDarkMode} {darkMode}/>
        <Inbox {darkMode}/>
       </div>
    </div>
</div>
