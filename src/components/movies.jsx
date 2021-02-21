import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../library/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
    
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: ''
    };

    render() { 
        const { movies, pageSize, currentPage, genres, selectedGenre } = this.state;
        // let genreMovies = '';
        let filteredMovies = paginate(movies, currentPage, pageSize);
        if(movies.length === 0) return (<div className="mt-2 alert alert-warning" role="alert">No movies!</div>);
        return (
            <React.Fragment>
                <div className="row align-items-top mt-2">

                    <div className="col-3 mt-2">
                        <ListGroup
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onGenreChange={this.handleGenreChange}
                        />
                    </div>
                    
                    <div className="col">
                
                        <div className="mt-2 alert alert-info" role="alert">{movies.length} movies</div>
                        
                        <table className="table">
                            
                            <thead>
                                
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>

                            </thead>
                            
                            <tbody>
                                
                                {filteredMovies.map( m =>(    
                                    <tr key={m._id}>
                                        <td>{m.title}</td>
                                        <td>{m.genre.name}</td>
                                        <td>{m.numberInStock}</td>
                                        <td>{m.dailyRentalRate}</td>
                                        <td><Like onLike={this.handleLike} movie={m} /></td>
                                        <td>
                                            <button 
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => this.handleDelete(m)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                        
                        <Pagination 
                            movieItems={movies.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />

                    </div>

                </div>
            </React.Fragment>
        );
    }

    componentDidMount(){
        const genres = [{_id: '123', name: 'All Genres'}, ...getGenres()]
        this.setState({ movies: getMovies(), genres });
    }
    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        const pageNum = (movies.length) / (this.state.pageSize);
        const pageSize = Math.ceil(pageNum);
        const currentPage = this.state.currentPage < pageSize ? this.state.currentPage : pageSize;
        this.setState({movies, currentPage});
    };
    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };
    handlePageChange = page => {
        this.setState({currentPage: page});
    };
    handleGenreChange = genre => {
        console.log(genre);
        let movies = [...getMovies()];
        movies = movies.filter(movie => {
            return movie.genre.name === genre.name;
        });
        if(genre.name == 'All Genres'){
            movies = [...getMovies()];
        }
        const selectedGenre = genre;
        this.setState({movies, currentPage: 1, selectedGenre});
    };
}

export default Movies;