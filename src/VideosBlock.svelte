<script>
    import {videos, users} from "./db"
    import {fly} from 'svelte/transition'
    import {createEventDispatcher} from 'svelte'

    let dispatch = createEventDispatcher()

    export let content

    //start watching
    function watch(video){
        dispatch('watch', {
            video: video
        })
    }

    //check channel
    function open_channel(channel){
        dispatch('channel', {
            channel: channel
        })
    }
</script>

{#each content as video}
    <div in:fly="{{x:-75}}" class="col s12 m4 l3">
        <div class="card hoverable grey lighten-4" on:click={()=>{watch(video)}}>
            <div class="card-image"><img src="https://videocontent.difres.ru/posters/{video}.png"><span class="card-title">{videos[video]['duration']}</span></div>
            <div class="card-content"><b>{videos[video]['name']}</b><br><a class="purple-text" on:click={() => {open_channel(videos[video]['channel'])}}>{users[videos[video]['channel']]['name']}</a><br><span class="grey-text">{videos[video]['date']}</span>
            </div>
        </div>
    </div>
{/each}


<style>
    .card {
        cursor:pointer;
    }
</style>

