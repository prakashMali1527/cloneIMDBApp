# Clone IMDB
- Shows Movies/Webseries based on user Search. 
- Add movies to local browser storage.

[Live Site](https://cloneimdb-by-prakash-1652ac.netlify.app/)

## Screens
![Home Page](https://res.cloudinary.com/dvwxolc6q/image/upload/v1717336826/HomePage-min_zjyvig.png)

![Search Movie](https://res.cloudinary.com/dvwxolc6q/image/upload/v1717336831/SearchMovie-min_g4dyjz.png)

![FavouriteList](https://res.cloudinary.com/dvwxolc6q/image/upload/v1717336848/FavouriteList-min_zrw4q1.png)

![MovieDetailPage](https://res.cloudinary.com/dvwxolc6q/image/upload/v1717336845/DetailPage-min_dpkfsb.png)

## API Reference

#### Get movies list by name

```http
  GET https://www.omdbapi.com/?s=${movie_name}&apikey=[api_key]
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get Movie detail by id

```http
  GET https://www.omdbapi.com/?i=${id}&apikey=[Your_key]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movie to fetch |







