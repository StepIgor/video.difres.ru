<script>
    import {users, videos} from "./db"
    import {fly, fade} from "svelte/transition"
    import {subs} from "./stores";
    import VideosBlock from "./VideosBlock.svelte"

    export let channel
    let all_videos = Object.keys(videos).filter((v) => videos[v]["channel"] == channel).reverse()
    let reached_limit = false
    let picked_videos = []
    let border = 10

    function subscribe() {
        if ($subs.indexOf(channel) == -1) {
            subs.set([...$subs, parseInt(channel)])
        } else {
            subs.set($subs.filter((c) => c != channel))
        }
    }


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
                <img class="ch_avatar" src="img/channels/{channel}/avatar.png"><br><br>
                <span><b>{users[channel]["name"]}</b>
                    {#if users[channel]["verified"]}
                                        <i class="material-icons purple-text text-darken-2">verified_user</i>
                                    {/if}</span><br>
                <span class="grey-text">{users[channel]["description"]}</span><br><br>
                {#if $subs.indexOf(channel) == -1}
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
    <div class="col s12 m12 l12">
        <div class="card grey lighten-5 left-align">
            <div class="card-content">
                <table>
                    <tr>
                        <td class="left-align">
                            <b>Дата регистрации:</b>
                        </td>
                        <td class="right-align">
                            {users[channel]["creation_date"]}
                        </td>
                    </tr>
                    <tr>
                        <td class="left-align">
                            <b>Количество видеороликов на канале:</b>
                        </td>
                        <td class="right-align">
                            {all_videos.length}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="col s12 m12 l12">
        <div class="card grey lighten-5 left-align">
            <div class="card-content">
                <div class="center-align">
                    <div class="row left-align">
                        <VideosBlock content={picked_videos} on:watch/>
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


<style>
    .ch_avatar {
        width: 128px;
        height: 128px;
        border-radius: 64px;
    }

    .material-icons {
        font-size: 16px;
    }
</style>