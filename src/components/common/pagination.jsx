import _ from 'lodash';

const Pagination = ({ movieItems, pageSize, currentPage, onPageChange }) => {
    
    const pageNumberArray = _.range(1, ( Math.ceil(movieItems.length / pageSize) + 1) );
    if(pageNumberArray.length === 1) return null;

    return( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                { pageNumberArray.map( pageNumber => <li key={pageNumber} onClick={()=>onPageChange(pageNumber)} className={currentPage === pageNumber? "page-item active": "page-item"}><a className="page-link">{pageNumber}</a></li> ) }
            </ul>
        </nav>
    );
}
 
export default Pagination;