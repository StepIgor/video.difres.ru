<script>
    import {createEventDispatcher} from 'svelte'

    let dispatch = createEventDispatcher();

    function transition() {
        dispatch('transition', {
            page: 'main'
        })
    }
</script>

<nav class="hide-on-large-only navbar-fixed">
    <nav class="purple darken-2">
        <div class="nav-wrapper">
            <a data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <a on:click={transition} class="brand-logo">Видео</a>
        </div>
    </nav>
</nav>