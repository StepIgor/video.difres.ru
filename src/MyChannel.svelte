<script>
    import {mychannel} from "./stores";
    import {users} from "./db";
    import {fly, blur} from "svelte/transition"
    import ChannelPage from "./ChannelPage.svelte"
    import UsersBlock from "./UsersBlock.svelte"


    let query
    let found_ch = []
    let rated_result = []

    function search() {
        if (query == undefined || query.replace(/ /g, '').length == 0) return
        found_ch = []
        rated_result = []
        let words = query.toLowerCase().split(' ')
        Object.keys(users).forEach((ch) => {
            let hits = 0
            let ch_title = users[ch]["name"].toLowerCase().split(' ')
            ch_title.forEach((word) => {
                if (words.indexOf(word) != -1) hits++
            })
            if (hits > 0) rated_result.push([ch, hits])
        })
        rated_result.sort((prev, next) => next[1] - prev[1]);
        rated_result.slice(0, 30);
        rated_result.map((el) => found_ch.push(el[0]))
    }

    function save_choice(ch) {
        mychannel.set(parseInt(ch.detail.channel))
    }

    function reset_choice(){
        mychannel.set(parseInt(-1))
    }
</script>

{#if users[$mychannel] != null}
    <div in:blur="{{duration: 300}}" class="row">
        <div class="col s12 m12 l12 hide-on-med-and-down">
            <h4 class="light">Мой канал</h4>
            <a on:click={reset_choice} class="purple-text">Выбрать другой аккаунт</a>
        </div>
        <div class="col s12 m12 l12 hide-on-large-only center-align">
            <h4 class="light">Мой канал</h4>
            <a on:click={reset_choice} class="purple-text">Выбрать другой аккаунт</a>
        </div>
    </div>
    <ChannelPage channel={$mychannel} on:watch/>
{:else}
    <div in:blur="{{duration: 300}}" class="row">
        <div class="col s12 m12 l12 hide-on-med-and-down">
            <h4 class="light">Мой канал</h4>
        </div>
        <div class="col s12 m12 l12 hide-on-large-only center-align">
            <h4 class="light">Мой канал</h4>
        </div>
        <div class="col s12 m12 l12">
            Начните вводить название канала в поле поиска ниже и отметьте аккаунт, который вы намереваетесь отслеживать
            в качестве собственного
        </div>
    </div>
    <div class="row">
        <div class="col s12 m12 l12">
            <div class="input-field">
                <input bind:value={query} type="text" placeholder="Название канала" maxlength="48">
            </div>
        </div>
    </div>
    <div class="row">
        <UsersBlock content={found_ch} on:channel={save_choice}/>
    </div>
{/if}

<svelte:body on:keyup={search}/>

<style>
    a{
        cursor: pointer;
    }
</style>