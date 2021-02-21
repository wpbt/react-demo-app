import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

class MoviesTable extends Component {
    
    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {
            key: 'like',
            content: movie => (
                <Like onLike={this.props.onLike} movie={movie} />
            )
        },
        {
            key: 'delete',
            content: movie => (
                <button 
                    className="btn btn-danger"
                    type="button"
                    onClick={() => this.props.onDelete(movie)}
                >
                    Delete
                </button>
            )
        }
    ];
    render() { 
        const {filteredMovies, sortColumn, onSort} = this.props;
        return (
            <table className="table">
                <TableHeader
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    data={filteredMovies}
                    columns={this.columns}
                />
            </table>                 
        );
    }
}
 
export default MoviesTable;