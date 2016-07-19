app.factory(`Service`, [
  `$http`,
  ($http) => {
    let service = {};
    const apiFM = `6e945ef718dcf6eaabef5ec3e448f358`;
    const apiNews = `d59c3a96787a47fbac3c5883285a660e`;
    const userFM = `cynthiacrescent`;

    service.getLocation = (lat, lon) => {
      return $http({
        method: `GET`,
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Failed to get location.`);
        }

        return response.data;
      })
    };

    service.getRecentTracks = () => {
      return $http({
        method: `GET`,
        url: `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userFM}&api_key=${apiFM}&format=json`
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Failed to get recent tracks.`);
        }

        return response.data.recenttracks;
      });
    };

    service.getNews = () => {
      return $http({
        method: `GET`,
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiNews}`
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Failed to get recent news.`);
        }

        return response.data.response.docs;
      });
    };

    return service;
  }
]);
