import * as rssParser from 'react-native-rss-parser';
 //fetches all Podcasts that were searched
 export const fetchPodcasts = (search) => {
    var toSearch = search.replace('', '+');
    return fetch(`https://itunes.apple.com/search?term=${toSearch}`)
        .then((response) => response.json())
        .then((json) => {
            var tmpSearchResults = [];
            json.results.map(pod => {
                //returning only podcasts from API
                if (pod.kind === 'podcast') {
                    var podcastInfo = {
                        id: pod.trackId,
                        image: pod.artworkUrl600,
                        name: pod.artistName,
                        url: pod.feedUrl,
                    }
                    tmpSearchResults.push(podcastInfo);
                }
            });
            return tmpSearchResults;
        })
        .catch((error) => {
            console.error(error);
        });
};

//fetches a specific podcast
export const fetchPodcast = (url) =>{   
    return fetch(url)
    .then((response) => {
        return response.text()
    })
    .then((data) => {
         return rssParser.parse(data)
     })
    .then((rss) => {
        return rss;
    })
     .catch(err => {
        console.log(err);
    });
};