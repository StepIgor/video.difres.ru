<script>
    import {blur} from "svelte/transition"
    import {subs} from "./stores"
    import {videos, users} from "./db"
    import {createEventDispatcher} from "svelte"
    import {slide} from "svelte/transition"
    import VideosBlock from "./VideosBlock.svelte"

    let dispatch = createEventDispatcher()

    function open_channel(c) {
        dispatch('channel', {
            channel: c
        })
    }

    function unsubscribe(c) {
        subs.set($subs.filter((ch) => ch != c))
    }

    let picked_videos = []
    //2 videos from each channel, common limit - 30-31 videos
    $subs.reverse().forEach((ch) => {
        if (picked_videos.length < 30){
            picked_videos = picked_videos.concat(Object.keys(videos).filter((v) => videos[v]["channel"] == ch).reverse().slice(0,2))
        } else {
            return
        }
    })
    picked_videos.sort((a,b) => {return parseInt(b) - parseInt(a)})
</script>

<div in:blur="{{duration:300}}" class="row">
    <div class="col s12 m12 l12 hide-on-med-and-down">
        <h4 class="light">Ваши подписки</h4>
    </div>
    <div class="col s12 m12 l12 hide-on-large-only center-align">
        <h4 class="light">Ваши подписки</h4>
    </div>
</div>

<div class="row">
    <div class="col s12 m12 l12">
        <span in:blur="{{duration: 300}}">Каналы, на которые вы подписались</span>
        {#if $subs.length > 0}
            <div class="collection">
                {#each $subs as sub}
                    <a in:slide="{{y:-50}}" on:click={()=>{open_channel(sub)}} class="collection-item purple-text"><img
                            src="img/channels/{sub}/avatar.png">
                        <span class="chan-name">{users[sub]["name"]}</span>
                        {#if users[sub]["verified"]}
                            <i class="material-icons purple-text text-darken-2 chan-name">verified_user</i>
                        {/if}
                        <div class="red-text unsub-but" on:click|stopPropagation={()=>{unsubscribe(sub)}}>Отписаться
                        </div>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="no-subs grey-text">
                Вы не подписаны ни на один канал
            </div>
        {/if}
    </div>
</div>

<div in:blur="{{duration: 300}}" class="row">
    <div class="col s12 m12 l12">
        Последние видеозаписи с каналов, на которые вы подписаны
    </div>
</div>

<div class="row">
    {#if $subs.length > 0}
        <VideosBlock content={picked_videos} on:watch on:channel/>
    {:else}
        <div class="col s12 m12 l12 grey-text">
            Для формирования подборки нужны активные подписки
        </div>
    {/if}
</div>


<style>
    .no-subs {
        padding-top: 15px;
    }

    img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        vertical-align: middle;
    }

    .chan-name {
        vertical-align: middle;
        margin-left: 5px;
    }

    .unsub-but {
        float: right;
        margin-top: 14px;
    }

    a {
        cursor: pointer;
    }
</style>