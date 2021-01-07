import React ,{Component}from 'react'
import PropTypes from 'prop-types'
export default class Layout extends Component {
    static propTypes = {
        header: PropTypes.element,
        footer: PropTypes.element,
        main: PropTypes.element,
    }

    render (){
        return(
            <div className="container">
                <header className="header">
                    {this.props.header}
                </header>
                <main>
                    {this.props.main}
                </main>
                <footer>
                    {this.props.footer}
                </footer>
            </div>
        ) 
    }
}