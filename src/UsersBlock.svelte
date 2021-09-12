<script>
    import {createEventDispatcher} from "svelte"
    import {fly} from "svelte/transition"
    import {users} from "./db.js"

    export let content
    let dispatch = createEventDispatcher()

    function open_channel(ch) {
        dispatch('channel', {
            channel: ch
        })
    }
</script>

{#each content as user}
    <div in:fly="{{x:-75}}" class="col s6 m3 l3">
        <div class="card hoverable grey lighten-4" on:click={()=>{open_channel(user)}}>
            <div class="card-image"><img src="img/channels/{user}/avatar.png"></div>
            <div class="card-content"><b class="truncate">{users[user]['name']}
                {#if users[user]["verified"]}
                    <i class="material-icons purple-text text-darken-2">verified_user</i>
                {/if}
            </b>
            </div>
        </div>
    </div>
{/each}

<style>
    .card {
        cursor: pointer;
    }
    i {
        vertical-align: top;
        font-size: 16px;
    }
</style>