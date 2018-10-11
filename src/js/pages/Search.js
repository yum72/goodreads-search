import React from "react";

import SearchBox from "../components/Search/SearchBox"

export default class Search extends React.Component {
    render() {

        const headingStyle = {
            textAlign: "center"
        }

        return(
            <div>
                <h1 style={headingStyle}>Search Books</h1>
                <SearchBox/>
            </div>
        )
    }
}