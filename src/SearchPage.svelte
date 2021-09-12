<script>
    import {fly} from "svelte/transition"
    import {videos, users} from "./db.js"
    import VideosBlock from "./VideosBlock.svelte";
    import UsersBlock from "./UsersBlock.svelte"

    let query
    let ch_opt = false

    let found = []
    let found_ch = []
    let rated_result = []


    //search engine
    function search() {
        if (query == undefined || query.replace(/ /g, '').length == 0) return
        found = []
        found_ch = []
        rated_result = []
        let words = query.toLowerCase().split(' ')
        if (!ch_opt) {
            Object.keys(videos).forEach((v) => {
                let hits = 0;
                let video_title = videos[v]['name'].toLowerCase().split(' ');
                video_title.forEach(function (keyword) {
                    if (words.indexOf(keyword) != -1) hits++;
                });
                if (hits != 0) rated_result.push([v, hits]);
            })
        } else {
            Object.keys(users).forEach((ch) => {
                let hits = 0
                let ch_title = users[ch]["name"].toLowerCase().split(' ')
                ch_title.forEach((word) => {
                    if (words.indexOf(word) != -1) hits++
                })
                if (hits > 0) rated_result.push([ch, hits])
            })
        }
        rated_result.sort((prev, next) => next[1] - prev[1]);
        rated_result.slice(0, 30);
        if (!ch_opt) rated_result.map((el) => found.push(el[0]))
        else rated_result.map((el) => found_ch.push(el[0]))
    }

    function reset(e){
        search()
    }

</script>

<svelte:body on:keypress={(e) => {if (e.key == 'Enter') search()}}/>

<div in:fly="{{y:-75}}" class="row">
    <div class="col s10 m11 l11 input-field">
        <input bind:value={query} type="text" placeholder="Что ищем?">
    </div>
    <div class="col s2 m1 l1">
        <button on:click={search} type="button" class="btn purple darken-2 white-text waves-effect waves-light"><i
                class="material-icons">search</i>
        </button>
    </div>
</div>
<div in:fly="{{y:-75}}" class="row options-container">
    <div class="col s12 m12 l12">
        <label>
            <input on:change={() => {ch_opt = !ch_opt; reset()}} bind:group={ch_opt} name="group1" type="radio" value={false} checked/>
            <span>Видео</span>
        </label>
        <label class="second-option">
            <input on:change={() => {ch_opt = !ch_opt; reset()}} bind:group={ch_opt} name="group1" type="radio" value={true}/>
            <span>Каналы</span>
        </label>
    </div>
</div>
<div class="row">
    {#if ch_opt}
        <UsersBlock content={found_ch} on:channel/>
    {:else}
        <VideosBlock content={found} on:watch on:channel/>
    {/if}
</div>


<style>
    button {
        margin-top: 25px;
    }

    .options-container {
        margin-top: -15px;
    }

    .second-option {
        margin-left: 15px;
    }
</style>