<script>
    import VideosBlock from "./VideosBlock.svelte"
    import {blur} from "svelte/transition"
    import {videos} from "./db.js"
    import {liked} from "./stores.js"
</script>

<div in:blur="{{duration:300}}" class="row">
    <div class="col s12 m12 l12 hide-on-med-and-down">
        <h4 class="light">Понравившиеся</h4>
    </div>
    <div class="col s12 m12 l12 hide-on-large-only center-align">
        <h4 class="light">Понравившиеся</h4>
    </div>
</div>

<div class="row">
    <VideosBlock content={$liked.reverse()} on:channel on:watch />
</div>
