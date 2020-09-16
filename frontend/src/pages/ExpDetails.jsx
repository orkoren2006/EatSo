import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';

class _ExpDetails extends Component {

    state = {
        exp: null
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const exp = await expService.getById(id);
        if(!exp) return;
        this.setState({exp}, () => console.log(this.state.exp))
    }
    

    render() {
        const {exp} = this.state;
        if (!exp) return <div> </div>
        return (
            <div className="exp-details">
                <section className="exp-img">
                    {
                        exp.imgUrls.map((imgUrl, idx) => <img key={`img-${idx}-${exp._id}`} src={imgUrl} alt="img" />)
                    }
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    };
  };
  const mapDispatchToProps = {
    
  };
  
  export const ExpDetails =  connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);