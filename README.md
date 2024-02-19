# Movie App

## Description

A front end movie app where user can browse for the movie they want and view detail of that movie

## Technologies and tool

<div style="display: flex; justify-content: flex-start; gap: 10px;"><a href="https://react.dev/" target="_blank"><img src="./images/React.png" alt="react" width="40" height="40"/></a><a href="https://redux.js.org/" target="_blank"><img src="./images/Redux.png" alt="redux" width="40" height="40"/></a><a href="https://reactrouter.com/en/main" target="_blank"><img src="./images/react-router-stacked-color.png" alt="react-router-dom" width="40" height="40"/></a><a href="https://axios-http.com/vi/docs/intro" target="_blank"><img src="./images/images.png" alt="axios" width="40" height="40"/></a><a href="https://sass-lang.com/" target="_blank"><img src="./images/pngwing.com.png" alt="scss" width="40" height="40"/></a></div>

## API

The api for this app: [https://developer.themoviedb.org/reference/intro/getting-started](https://developer.themoviedb.org/reference/intro/getting-started)

## Demo Link

[https://movie-app-scss.netlify.app/](https://movie-app-scss.netlify.app/)

## Features

- In HomePage user can see all Trending, What's Popular, Top Rated of all movies antv shows

- User can view detail of movie of TV show by clicking to it

- User can search for the movies they want

- User can explore movies and TV shows and also filter it as user want

## Endpoint APIs

```javascript
/**
 * @route GET https://api.themoviedb.org/3/trending/movie/{time_window}
 * Get the trending movies
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/trending/tv/{time_window}
 * Get the trending movies
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/movie/popular
 * Get the popular movies
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/tv/popular
 * Get the popular tv shows
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/movie/top_rated
 * Get the top rated movies
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/tv/top_rated
 * Get the top rated tv shows
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/movie/{movie_id}
 * Get detail of movie
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/tv/{series_id}
 * Get detail of tv show
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/movie/{movie_id}/similar
 * Get the similar movies based on genres and keywords.
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/tv/{series_id}/similar
 * Get the similar TV shows.
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/movie/{movie_id}/recommendations
 * Get recommendations movies
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/tv/{series_id}/recommendations
 * Get recommendations tv shows
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/discover/movie
 * Get discover movies with filter
 */
```

```javascript
/**
 * @route GET https://api.themoviedb.org/3/discover/tv
 * Get discover tv shows with filter
 */
```
