import React from "react";
import * as Actions from '../bookAction'
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import '../../css/singlePage.css'

class SingleBook extends React.Component {

    componentWillMount() {
        const id = this.props.match.params.id
        this.props.getSingleBookDetails(id)
    }

    render() {

        const { singleBook } = this.props;

        return (
            <div className="completeResults">
                <Link to='/'>Home</Link>
                <div className="wrapper">
                    <div>
                        <img src={singleBook.imageURL} />
                    </div>
                    <div className="textBox">
                        <p>Book Name : {singleBook.name}</p>
                        <p>Author :{singleBook.author}</p>
                        <p>Average Rating :{singleBook.avg_rating}</p>
                        <p>Total Rating :{singleBook.total_rating}</p>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = store => ({
    singleBook: store.books.singleBook
})

const mapDispatchToProps = dispatch => ({
    getSingleBookDetails: bindActionCreators(Actions.getSingleBookDetails, dispatch)
})

SingleBook = connect(mapStateToProps, mapDispatchToProps)(SingleBook)

export default SingleBook