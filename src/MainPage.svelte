<script>
    import {blur, fly} from 'svelte/transition'
    import {videos, users} from './db.js'
    import {history} from "./stores";
    import {createEventDispatcher} from 'svelte'
    import VideosBlock from './VideosBlock.svelte'

    let dispatch = createEventDispatcher()
    let new_videos = []
    let picked_videos = []
    let history_videos = []

    //last new videos
    Object.keys(videos).reverse().forEach((v) => {
        if (new_videos.length < 4) new_videos.push(v);
    })

    //recommended videos
    for (let k=0; k<4; k++){
        let pick_now;
        if (Object.keys(videos).length == 0) break;
        do {
            pick_now = randomInteger(1, Object.keys(videos).length);
        } while (picked_videos.indexOf(pick_now) != -1);
        picked_videos.push(pick_now);
        if (picked_videos.length == Object.keys(videos).length){
            break;
        }
    }

    //last watched videos
    $history.reverse().forEach((video) => {if (history_videos.length < 4) history_videos.push(video)});

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

</script>

<div in:blur="{{duration: 300}}" class="row">
    <div class="col s12 m12 l12 hide-on-med-and-down">
        <h4 class="light">Добро пожаловать!</h4>
    </div>
    <div class="col s12 m12 l12 hide-on-large-only center-align">
        <h4 class="light">Добро пожаловать!</h4>
    </div>
</div>


<!-- new videos block -->
<div in:blur="{{duration: 300}}" class="row">
    <div class="col s12 m12 l12">
        <h5 class="light"><i class="material-icons left purple-text text-darken-2">fiber_new</i>Новые видеозаписи</h5>
    </div>
</div>
<div class="row">
    <VideosBlock content={new_videos} on:watch on:channel />
</div>

<!-- recommendations -->
<div in:blur="{{duration: 300}}" class="row">
    <div class="col s12 m12 l12">
        <h5 class="light"><i class="material-icons left purple-text text-darken-2">explore</i>Рекомендации</h5>
    </div>
</div>
<div class="row">
    <VideosBlock content={picked_videos} on:watch on:channel />
</div>

<!-- watch again block -->
<div in:blur="{{duration: 300}}" class="row">
    <div class="col s12 m12 l12">
        <h5 class="light"><i class="material-icons left purple-text text-darken-2">replay</i>Посмотреть ещё раз</h5>
    </div>
</div>
<div class="row">
    <VideosBlock content={history_videos} on:watch on:channel />
</div>