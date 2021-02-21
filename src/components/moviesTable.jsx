import Like from './common/like';


const MoviesTable = ({filteredMovies, onLike, onDelete}) => {
    return (
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
 
export default MoviesTable;