app.factory(`Service`, [
  `$http`,
  ($http) => {
    let service = {};

    const apiOpenWeatherMap = `3e9bf4b44d91035d2b502d445af152ce`;
    const apiSteam = `BF5F20D59B3A29772A03EDD9470780C5`;
    const apiFM = `6e945ef718dcf6eaabef5ec3e448f358`;
    const apiNews = `d59c3a96787a47fbac3c5883285a660e`;
    const idSteam = `76561198046827360`;
    const userFM = `cynthiacrescent`;

    service.getCurrentWeather = (location) => {
      return $http({
        method: `GET`,
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&units=metric&APPID=${apiOpenWeatherMap}`
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Failed to get weather data.`);
        }

        return response.data;
      });
    };

    service.getSteamData = () => {
      return $http({
        method: `GET`,
        url: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiSteam}&steamids=${idSteam}`
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Failed to get steam profile.`);
        }

        return response.data.response.players[0];
      });
    };

    service.getSteamFriends = () => {
      return $http({
        method: `GET`,
        url: `https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${apiSteam}&steamid=${idSteam}&relationship=friend`
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Failed to get steam profile.`);
        }

        return response.data.friendslist.friends;
      });
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

    service.getAlbumChart = () => {
      return $http({
        method: `GET`,
        url: `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${userFM}&api_key=${apiFM}&format=json`
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Failed to get album chart.`);
        }

        return response.data.weeklyalbumchart;
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
