import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ShowcasePhoto extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount() {
      this.props.onComponentMount(this.props.params.photoId)
    }
    render() {
      return (
        <div className="w3-container">
          <p className={this.props.infoClass}>{this.props.info}</p>
          <div className="w3-row">
            <div className="w3-col s3 w3-dark-grey w3-center w3-text-white">
              <h4>NAME : {this.props.photo.name}</h4>
              <h4>DESCRIPTION : {this.props.photo.description}</h4>
              <h4>UPLOADED : {this.props.photo.created}</h4>
            </div>
            <div className="w3-col s9 w3-center">
              <img src={"/images/"+this.props.photo.name+".png"} />
            </div>
          </div>
        </div>
      )
    }
}

ShowcasePhoto.propTypes = {
  photo: PropTypes.object.isRequired,
  info: PropTypes.string.isRequired,
  infoClass: PropTypes.string.isRequired,
  clearInfo: PropTypes.func.isRequired,
  onComponentMount: PropTypes.func.isRequired,
}

export default ShowcasePhoto
