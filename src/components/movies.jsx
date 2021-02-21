import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../library/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
    
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' },
        currentPage: 1,
        selectedGenre: ''
    };

    render() { 
        const { movies, pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;

        const sortedMovies = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
        let filteredMovies = paginate(sortedMovies, currentPage, pageSize);

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
                        <MoviesTable
                            filteredMovies={filteredMovies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
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
    handleSort = sortColumn => {
        
        this.setState({sortColumn});
    };
}

export default Movies;