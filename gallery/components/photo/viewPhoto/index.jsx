import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ViewPhoto extends React.Component {
    constructor(props) {
    super(props);
    this.deletePhotoClicked = this.deletePhotoClicked.bind(this);
  }
  componentWillMount() {
    this.props.onComponentMount(this.props.album)
  }
  componentWillUnmount() {
    this.props.clearInfo()
  }
  deletePhotoClicked(photo) {
    this.props.onDeletePhoto(photo)
  }
  render() {
    return (
      <div className="w3-container">
        <p className={this.props.infoClass}>{this.props.info}</p>
          {this.props.photos.map((photo, idx) => {
            return (
              <div key={idx} className="w3-display-container w3-quarter w3-hover-opacity w3-black">
                <img src={"/images/"+photo.name+".png"} alt="Photo"></img>
                <div className="w3-display-topleft w3-display-hover">
                    <button className="w3-white w3-animate-opacity w3-btn w3-margin w3-round" onClick={() => {this.deletePhotoClicked(photo)}} title="Delete Photo"><i className="fa fa-close w3-text-red"></i></button>
                </div>
                <div className="w3-display-middle w3-display-hover">
                  <p className="w3-black">{photo.description}</p>
                </div>
                <div className="w3-display-bottomright w3-display-hover">
                  <p className="w3-black">{photo.created}</p>
                </div>
                <div className="w3-display-bottomleft w3-display-hover">
                  <p className="w3-black">{parseInt(photo.privacy) == 0?"PRIVATE":"PUBLIC"}</p>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}

ViewPhoto.propTypes = {
    photos: PropTypes.array.isRequired,
  	info: PropTypes.string.isRequired,
  	infoClass: PropTypes.string.isRequired,
  	clearInfo: PropTypes.func.isRequired,
  	onDeletePhoto: PropTypes.func.isRequired,
  	onComponentMount: PropTypes.func.isRequired,
}

export default ViewPhoto
