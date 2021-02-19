import React, { Component } from 'react';

class Like extends Component {
    render() { 
        const { onLike, movie } = this.props;
        return (<i onClick={() => onLike(movie)} style={{cursor: 'pointer'}} className={ movie.liked ? "fa fa-heart": "fa fa-heart-o" }></i>);
    }
}
 
export default Like;