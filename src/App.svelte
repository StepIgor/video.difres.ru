<script>
    import Sidenav from './Sidenav.svelte'
    import Navbar from './Navbar.svelte'
    import Content from './Content.svelte'
    import {lastAppUpdate} from "./stores";

    let currentDate = new Date()

    if ($lastAppUpdate.length == 0 || $lastAppUpdate[0] != currentDate.getDate() || $lastAppUpdate[1] != currentDate.getMonth() || $lastAppUpdate[2] != currentDate.getFullYear()){
        let lastUpdate = []
        lastUpdate.push(currentDate.getDate())
        lastUpdate.push(currentDate.getMonth())
        lastUpdate.push(currentDate.getFullYear())
        lastAppUpdate.set(lastUpdate)
        window.location.reload(true)
    }

    let page = 'main'

    function transition(newpage){
        page = newpage.detail.page
    }
</script>

<Sidenav on:transition={transition} page={page}/>
<Navbar on:transition={transition}/>
<Content page={page} on:transition={transition}/>


