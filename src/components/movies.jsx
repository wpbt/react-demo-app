import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies()
    };
    render() { 
        const { movies } = this.state;
        if(movies.length === 0) return <p>No movies!</p>
        return (
            <React.Fragment>
                <p>{movies.length} movies</p>
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
                        {movies.map( m =>(    
                            <tr key={m._id}>
                                <td>{m.title}</td>
                                <td>{m.genre.name}</td>
                                <td>{m.numberInStock}</td>
                                <td>{m.dailyRentalRate}</td>
                                <td><i className="fa fa-heart"></i></td>
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
            </React.Fragment>
        );
    }
    handleDelete = (movie) => {
        console.log(`Delete movie: `, movie._id);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };
}
 
export default Movies;