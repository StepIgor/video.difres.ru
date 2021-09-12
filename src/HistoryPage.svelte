<script>
    import VideosBlock from "./VideosBlock.svelte"
    import {blur} from "svelte/transition"
    import {videos} from "./db.js"
    import {history} from "./stores.js"


    function clear_history(){
        history.set([])
    }
</script>

<div in:blur="{{duration:300}}" class="row">
    <div class="col s12 m12 l12 hide-on-med-and-down">
        <h4 class="light">История</h4>
    </div>
    <div class="col s12 m12 l12 hide-on-large-only center-align">
        <h4 class="light">История</h4>
    </div>
</div>

<div in:blur="{{duration:300}}" class="row">
    <div class="col s12 m12 l12">
        <a on:click={clear_history} class="red-text">Очистить историю</a>
    </div>
</div>

<div class="row">
    <VideosBlock content={$history.reverse()} on:channel on:watch />
</div>

<style>
    a {
        cursor: pointer;
    }
</style>