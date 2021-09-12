<script>
    import MainPage from './MainPage.svelte'
    import WatchPage from "./WatchPage.svelte"
    import SubsPage from "./SubsPage.svelte"
    import LikedPage from "./LikedPage.svelte"
    import HistoryPage from "./HistoryPage.svelte"
    import SearchPage from "./SearchPage.svelte"
    import {createEventDispatcher} from 'svelte'
    import ThemePage from "./ThemePage.svelte";
    import ChannelPage from "./ChannelPage.svelte"
    import MyChannel from "./MyChannel.svelte"

    export let page
    let video
    let channel
    let theme
    let dispatch = createEventDispatcher()

    function watch(watchvideo) {
        video = parseInt(watchvideo.detail.video)
        dispatch('transition', {
            page: 'watch'
        })
    }

    function open_channel(chan) {
        channel = parseInt(chan.detail.channel)
        dispatch('transition', {
            page: 'channel'
        })
    }

    function open_theme(th) {
        theme = parseInt(th.detail.theme)
        dispatch('transition', {
            page: 'theme'
        })
    }
</script>


<div class="main">
    {#if page == 'main'}
        <MainPage on:watch={watch} on:channel={open_channel}/>
    {:else if page == "watch"}
        <WatchPage video={video} on:theme={open_theme} on:channel={open_channel} on:watch={watch}/>
    {:else if page == "subscriptions"}
        <SubsPage on:channel={open_channel} on:watch={watch}/>
    {:else if page == "liked"}
        <LikedPage on:channel={open_channel} on:watch={watch}/>
    {:else if page == "history"}
        <HistoryPage on:channel={open_channel} on:watch={watch}/>
    {:else if page == "search"}
        <SearchPage on:channel={open_channel} on:watch={watch}/>
    {:else if page == "theme"}
        <ThemePage on:channel={open_channel} on:watch={watch} theme={theme}/>
    {:else if page == "channel"}
        <ChannelPage channel={channel} on:watch={watch}/>
    {:else if page == "my_channel"}
        <MyChannel on:watch={watch}/>
    {/if}
</div>

<style>
    @media (min-width: 992px) {
        .main {
            padding-left: 320px;
        }
    }
</style>



