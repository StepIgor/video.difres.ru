<script>
    import VideosBlock from "./VideosBlock.svelte"
    import {themes, videos} from "./db"
    import {fly} from "svelte/transition"

    export let theme
    let picked_videos = []
    let border = 10
    let all_videos = Object.keys(videos).filter((v) => videos[v]["theme"] == theme).reverse()
    let reached_limit = false

    function pick_up() {
        picked_videos = all_videos.slice(0, border)
    }

    function expand_range(){
        if (border > all_videos.length){
            reached_limit = true
            return
        } else {
            border += 10
            pick_up()
        }
    }

    pick_up()
</script>

<div in:fly="{{x:-75}}" class="row">
    <div class="col s12 m12 l12">
        <div class="card grey lighten-5 center-align">
            <div class="card-content">
                Видео из категории<br>
                <span><b>{themes[theme]}</b></span><br>
            </div>
        </div>
    </div>
</div>
<div in:fly="{{fly:-75}}" class="row">
    <div class="col s12 m12 l12">
        <div class="card">
            <div class="card-content grey lighten-5">
                <div class="center-align">
                    <div class="row left-align">
                        <VideosBlock content={picked_videos} on:watch on:channel/>
                    </div>
                    <button on:click={expand_range} class="btn waves-effect waves-purple grey lighten-5 purple-text">
                        {#if !reached_limit}
                            <i class="material-icons left">add</i>Показать больше
                        {:else}
                            Видео больше нет
                        {/if}
                        </button>
                </div>
            </div>
        </div>
    </div>
</div>