const Like = ({onLike, movie}) => {
    return (
        <i 
            onClick={() => onLike(movie)}
            style={{cursor: 'pointer'}}
            className={ movie.liked ? "fa fa-heart": "fa fa-heart-o" }
        >
        </i>
    );
}
 
export default Like;
