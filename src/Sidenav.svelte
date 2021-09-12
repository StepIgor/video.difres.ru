<script>
    import {createEventDispatcher} from 'svelte'

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    });

    const dispatch = createEventDispatcher();
    export let page

    function transition(page) {
        dispatch('transition', {
            page: page
        })
        if (window.innerWidth < 992)  M.Sidenav.getInstance(document.querySelectorAll('.sidenav')[0]).close()
    }
</script>

<ul id="slide-out" class="sidenav sidenav-fixed purple darken-2" style="box-shadow:1px 0px 5px;">
    <li>
        <div class="user-view">
            <a on:click={() => {transition('main')}}><img src="white_logo.png"></a>
            <a on:click={() => {transition('main')}}><span class="white-text name">DIFRES.RU Видео</span></a>
            <a on:click={() => {transition('main')}}><span class="white-text email">Видеохостинг</span></a>
        </div>
    </li>
    <li class:active="{page == 'subscriptions'}"><a on:click={() => {transition('subscriptions')}} class="white-text"><i class="material-icons white-text">subscriptions</i>Подписки</a>
    </li>
    <li class:active="{page == 'liked'}"><a on:click={() => {transition('liked')}} class="white-text"><i class="material-icons white-text">favorite</i>Понравившиеся</a>
    </li>
    <li class:active="{page == 'history'}"><a on:click={() => {transition('history')}} class="white-text"><i class="material-icons white-text">history</i>История</a>
    </li>
    <li class:active="{page == 'search'}"><a on:click={() => {transition('search')}} class="white-text"><i class="material-icons white-text">search</i>Поиск</a>
    </li>
    <li>
        <div class="divider"></div>
    </li>
    <li><a class="subheader white-text">Действия</a></li>
    <li class:active="{page == 'my_channel'}"><a on:click={() => {transition('my_channel')}} class="white-text"><i class="material-icons white-text">account_box</i>Мой
        канал</a></li>
    <li><a href="mailto:service@difres.ru" class="white-text"><i class="material-icons white-text">email</i>Обратная связь</a></li>
</ul>

<style>
    a {
        cursor: pointer;
    }
    .active {
        background: #6F1C92;
    }
    img {
        width: 64px;
        height: 64px;
    }
</style>