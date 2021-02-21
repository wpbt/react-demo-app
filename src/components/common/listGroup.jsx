import PropTypes from 'prop-types';

const ListGroup = ({genres, onGenreChange}) => {
    console.log(genres);
    return (
        <ul className="list-group">
            {genres.map(genre => (
                <li 
                    key={genre._id}
                    className="list-group-item"
                    style={{cursor: 'pointer'}}
                    onClick={()=>onGenreChange(genre)}
                >
                    {genre.name}
                </li>
            ) )}
        </ul>
    );
}
ListGroup.propTypes = {
    genres: PropTypes.array.isRequired,
    onGenreChange: PropTypes.func.isRequired
};

export default ListGroup;