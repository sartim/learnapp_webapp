import React from 'react';
import { Link } from 'react-router-dom';
import Script from "../../_helpers/script";

class FabPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="fixed-action-btn" style={{bottom: '50px', right: '19px'}}>
            {/*<a className="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow">*/}
              {/*<i className="material-icons">arrow_drop_up</i>*/}
            {/*</a>*/}
            {/*<ul>*/}
              {/*<li>*/}
                {/*<Link to="/help" className="btn-floating blue" style={{transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px)', opacity: '0'}}>*/}
                  {/*<i className="material-icons">help_outline</i>*/}
                {/*</Link>*/}
              {/*</li>*/}
              {/*<li>*/}
                {/*<Link to="/chat" className="btn-floating green" style={{transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px)', opacity: '0'}}>*/}
                  {/*<i className="material-icons">chat_bubble</i>*/}
                {/*</Link>*/}
              {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/quiz/create" className="btn-floating red" style={{transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px)', opacity: '0'}}>*/}
                        {/*<i className="material-icons">add</i>*/}
                    {/*</Link>*/}
                {/*</li>*/}

            {/*</ul>*/}
        </div>
        );
    }
}

export { FabPage };
