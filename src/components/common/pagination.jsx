import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ movieItems, pageSize, currentPage, onPageChange }) => {
    
    const pageNumberArray = _.range(1, ( Math.ceil(movieItems / pageSize) + 1) );
    if(pageNumberArray.length === 1) return null;

    return( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                { pageNumberArray.map( pageNumber => <li key={pageNumber} onClick={()=>onPageChange(pageNumber)} className={currentPage === pageNumber ? "page-item active": "page-item"}><a className="page-link" style={{cursor: 'pointer'}}>{pageNumber}</a></li> ) }
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    movieItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;