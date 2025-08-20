Movie Finder API is a simple Node.js and Express app that lets you search for movies and get details about them using the OMDb API. You can look up movies by title or by their IMDb ID. The app also has error handling for missing info or wrong routes, and it keeps the API key safe with environment variables. This project is a basic example of building a REST API and using data from another API.   

For example, you can search movies with:     
http://localhost:3004/api/search?title=batman    

or get details for a specific movie with:   
 http://localhost:3004/api/movies/tt0372784