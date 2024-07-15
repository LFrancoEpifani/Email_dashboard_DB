<script>
    import User from '../assets/unnamed.png';
    export let toggleDarkMode;
    export let darkMode = false;
</script>

<header class="flex flex-col relative z-20 shadow-lg border-b border-gray-700 bg-bg_gradient p-1">
    <div class="flex items-center justify-between w-full p-2">
        <div class="flex items-center justify-center">
            <a href="/" >
                <h1 class="text-txt_color text-xl">Email Dashboard</h1>
            </a>
            <button on:click={toggleDarkMode} class="w-10 h-10 text-xl">
                {#if darkMode}
                    <i class="fa-solid fa-moon text-slate-700"></i>
                {:else}
                    <i class="fa-solid fa-sun text-yellow-500"></i>
                {/if}
                </button>
        </div>
        <div class="relative">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs"></i>
            <input class="bg-transparent border-b border-gray-800 bg-bg_gradient pl-8 pr-20 py-1 text-sm 2xl:text-lg" placeholder="Buscar" type="text">
        </div>
        <nav class="flex items-center gap-4 lg:gap-6 text-lg">
            <div class="relative flex gap-2 justify-center items-center">
                <div class="text-xs text-end text-txt_color 2xl:text-[16px] flex flex-col gap-2">
                    <h3>Luciano Epifani</h3>
                    <p>lucianof.epifani@gmail.com</p>
                </div>
                <button class="flex items-center justify-center gap-2">
                    <img src={User} alt="User" class="h-8 w-full rounded-full 2xl:h-12"/>
                    <i class="fa-solid fa-chevron-down text-xs text-txt_color"></i>
                </button>
            </div> <!-- Asegúrate de cerrar este div -->
        </nav>
    </div>
</header>
