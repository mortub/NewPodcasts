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
export const fetchPodcast = async (url, page) => {
    var rssToReturn; 
    var urlToFetch =  url.concat(`/page/${page}`);
     await fetch(urlToFetch)
    .then((response) => {
        return response.text()
    })
    .then((data) => {
         return rssParser.parse(data)
     })
    .then((rss) => {
        rssToReturn =rss;
        return rss;
    })
     .catch(err => {
        console.log(err);
    });

    return rssToReturn;
};

//fetches the most popular podcasts in the US
export const fetchPopularPodcasts = ()=>{
    return fetch('https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/10/explicit.json')
        .then((response) => response.json())
        .then((json) => {
            var tmpResults = [];
            json.feed.results.map(pod => {
                //returning only podcasts from API            
                    var podcastInfo = {
                        id: pod.id,
                        image: pod.artworkUrl100,
                        name: pod.name,
                        url: pod.url,
                    }
                    tmpResults.push(podcastInfo);               
            });
            return tmpResults;
        })
        .catch((error) => {
            console.error(error);
        });
};