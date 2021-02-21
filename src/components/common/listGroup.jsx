import PropTypes from 'prop-types';

const ListGroup = ({genres, textProperty, valueProperty, onGenreChange, selectedGenre}) => {
    return (
        <ul className="list-group">
            {genres.map(genre => (
                <li 
                    key={genre[valueProperty]}
                    className={genre === selectedGenre ? "list-group-item active" : "list-group-item"}
                    style={{cursor: 'pointer'}}
                    onClick={()=>onGenreChange(genre)}
                >
                    {genre[textProperty]}
                </li>
            ) )}
        </ul>
    );
}

ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
};
ListGroup.propTypes = {
    genres: PropTypes.array.isRequired,
    onGenreChange: PropTypes.func.isRequired
};

export default ListGroup;