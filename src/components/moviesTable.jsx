import React, { Component } from 'react';
import Like from './common/like';

class MoviesTable extends Component {
    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };
        if(path === sortColumn.path){
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };
    render() { 
        const {filteredMovies, onLike, onDelete} = this.props;
        return (
            <table className="table">                 
                <thead>
                    <tr>
                        <th onClick={() => this.raiseSort('title')} scope="col">Title</th>
                        <th onClick={() => this.raiseSort('genre.name')} scope="col">Genre</th>
                        <th onClick={() => this.raiseSort('numberInStock')} scope="col">Stock</th>
                        <th onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
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
                            <td><Like onLike={onLike} movie={m} /></td>
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => onDelete(m)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>                 
        );
    }
}
 
export default MoviesTable;