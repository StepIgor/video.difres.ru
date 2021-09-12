<script>
    import {videos, users, comments, themes} from "./db"
    import {history, liked, subs} from "./stores"
    import {createEventDispatcher} from "svelte"
    import {fly, fade} from "svelte/transition"
    import VideosBlock from "./VideosBlock.svelte"

    let dispatch = createEventDispatcher()

    function open_theme(th) {
        dispatch('theme', {
            theme: th
        })
    }

    export let video

    //update watch history
    $: history.set($history.filter((v) => v != video).concat(parseInt(video)))

    function like() {
        if ($liked.indexOf(video) == -1) {
            liked.set([...$liked, parseInt(video)])
        } else {
            liked.set($liked.filter((v) => v != video))
        }
    }

    function subscribe() {
        if ($subs.indexOf(videos[video]["channel"]) == -1) {
            subs.set([...$subs, parseInt(videos[video]["channel"])])
        } else {
            subs.set($subs.filter((c) => c != videos[video]["channel"]))
        }
    }


    function open_channel(channel) {
        dispatch('channel', {
            channel: channel
        })
    }


    //other channel videos pick
    $: other_channel_videos = Object.keys(videos).filter((v) => videos[v]["channel"] == videos[video]["channel"] && v != video).reverse().slice(0, 4);


    //comments
    $: video_comments = Object.keys(comments).filter((c) => comments[c]["related video"] == video)
</script>

<div in:fly="{{x:-75}}" class="row">
    <!-- video block -->
    <div class="col s12 m12 l12 center-align">
        <video class="responsive-video" src="https://videocontent.difres.ru/{video}.mp4" controls controlsList="nodownload"></video>
    </div>

    <!-- video info + like -->
    <div class="col s12 m12 l12">
        <div class="card grey lighten-5">
            <div class="card-content">
                <div class="row">
                    <div class="col s12 m8 l8">
                        <h5 class="light">{videos[video]["name"]}</h5>
                        <blockquote>
                            <div>
                                {videos[video]["description"]}
                            </div>
                        </blockquote>
                        <span class="grey-text">{videos[video]["date"]}</span>
                        <a on:click={()=>{open_theme(videos[video]["theme"])}}
                           class="purple-text video-category">{themes[videos[video]["theme"]]}</a>
                    </div>
                    <div class="col s12 m4 l4 right-align like-but-container">
                        <div class="hide-on-small-only helper-block"></div>
                        {#if $liked.indexOf(video) == -1}
                            <button in:fade on:click={like} class="btn waves-effect waves-light purple white-text"><i
                                    class="material-icons left">favorite_border</i>Нравится
                            </button>
                        {:else}
                            <button in:fade on:click={like}
                                    class="btn waves-effect waves-light grey lighten-2 purple-text"><i
                                    class="left material-icons purple-text">favorite</i>Вам понравилось
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- channel info block -->
    <div class="col s12 m12 l12">
        <div class="card grey lighten-5">
            <div class="card-content">
                <div class="row">
                    <div class="col s12 m8 l8">
                        <table>
                            <tr>
                                <td class="channel-img-container">
                                    <a on:click={()=>{open_channel(videos[video]["channel"])}}><img
                                            src="img/channels/{videos[video]["channel"]}/avatar.png"
                                            class="responsive-img avatar" /></a>
                                </td>
                                <td>
                                    <a on:click={()=>{open_channel(videos[video]["channel"])}}
                                       class="black-text channel-name">{users[videos[video]["channel"]]["name"]}</a><span
                                >
                                    {#if users[videos[video]["channel"]]["verified"]}
                                        <i class="material-icons tooltipped purple-text text-darken-2">verified_user</i>
                                    {/if}
                                </span><br>
                                    <span class="grey-text">{users[videos[video]["channel"]]["description"]}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col s12 m4 l4 right-align">
                        <div class="hide-on-small-only helper-block"></div>
                        {#if $subs.indexOf(videos[video]["channel"]) == -1}
                            <button in:fade on:click={subscribe} class="btn waves-effect waves-light purple white-text">
                                <i
                                        class="material-icons left">add_box</i>Подписаться
                            </button>
                        {:else}
                            <button in:fade on:click={subscribe}
                                    class="btn waves-effect waves-light grey lighten-2 purple-text"><i
                                    class="left material-icons purple-text">check_box</i>Вы подписаны
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- recommended videos -->
    <div class="col s12 m12 l12">
        <div class="card grey lighten-5">
            <div class="card-content">
                <div class="card-title">
                    Другие видео этого канала
                </div>
                <div class="row">
                    <VideosBlock content={other_channel_videos} on:watch on:channel/>
                </div>
            </div>
        </div>
    </div>


    <!-- comments block -->
    <div class="col s12 m12 l12">
        <div class="card grey lighten-5">
            <div class="card-content">
                <div class="card-title">
                    Комментарии (<span>{video_comments.length}</span>)
                </div>
                <div>
                    {#each video_comments as comment}
                        <blockquote in:fly="{{x:-75}}"><a class="black-text" on:click={()=>{open_channel(comments[comment]["author"])}}><b>{users[videos[video]["channel"]]["name"]}</b></a> <span class="grey-text">{comments[comment]["date"]}</span><br>{comments[comment]["content"]}</blockquote>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    video {
        min-width: 100%;
        max-height: 720px;
        margin-top: 15px;
    }

    blockquote {
        border-left: 5px solid #9c27b0;
    }

    .video-category {
        margin-left: 15px;
    }

    .helper-block {
        margin-top: 35px;
    }

    .like-but-container {
        margin-top: 15px;
    }

    a {
        cursor: pointer;
    }

    table {
        border: none;
    }

    tr {
        border-bottom: none;
    }

    td {
        vertical-align: middle;
    }

    .avatar {
        width: 64px;
        height: 64px;
        border-radius: 32px;
        vertical-align: middle;
    }

    .channel-name {
        font-weight: bold;
    }

    .helper-block {
        margin-top: 35px;
    }

    .channel-img-container {
        width: 80px;
    }

    .tooltipped {
        font-size: 16px;
    }
</style>