//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import theme from './MediaStep.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import ReactPlayer from 'react-player';
import { TextField } from 'lib/redux-form-material-ui';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import uploadPhotoMutation from './uploadPhoto.graphql';
import FileInput from './FileInput.jsx';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { mediaEndpoint } from 'data/endpoints';

type Props = {
  mutate: Function,
  logoFilename: string,
  videoURL: string,
};

type State = {};
const fallbackURL = '/static/img/defaults/image_not_found.jpg';
class MediaStep extends Component<Props, State> {
  state: State = {
    crop: {},
    pixelCrop: {},
  };
  props: Props;

  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      this.setState({ result: e.target.result });
      this.props.change('imageData', e.target.result);

      // this.props
      //   .mutate({
      //     variables: {
      //       filename: file.name,
      //       photo: e.target.result,
      //     },
      //   })
      //   .then(d => {
      //     const { data } = d;
      //     this.props.change('logoDestination', `http://localhost${data.uploadPhoto.url}`);
      //     this.props.change('logoFilename', file.name);
      //     this.props.change('imageId', data.uploadPhoto.id);
      //   })
      //   .catch(error => console.error(error));
    });
  };

  onCropChange = async (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  };

  renderImagePreview = (logoURL, endpoint, result) => {
    let imageSource;

    if (logoURL && (result === undefined || result === null)) {
      if (logoURL === fallbackURL) return null;
      imageSource = `${endpoint}${logoURL}`;
      return <img style={{ width: '100%' }} alt="Preview" src={imageSource} />;
    }

    if (result === undefined || result === null) {
      return null;
    }

    imageSource = result;
    return <img style={{ width: '100%' }} alt="Preview" src={imageSource} />;
  };

  render() {
    const { initialValues } = this.props;
    let logoURL = null;
    if (initialValues) {
      if (initialValues.logoURL) {
        logoURL = initialValues.logoURL;
      }
    }
    return (
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <FileInput
            as="url"
            id="my-file-input"
            change={this.props.change}
            accept="image/gif,image/jpeg,image/jpg,image/png"
            onChange={this.handleChange}
          >
            <Button
              style={{
                border: '.5px solid',
                width: '100%',
                marginBottom: 20,
                color: '#949494',
              }}
            >
              {this.props.logoURL && this.props.logoURL !== fallbackURL
                ? 'Edit Event Image'
                : 'Choose Event Image'}
            </Button>
          </FileInput>
          {this.renderImagePreview(this.props.logoURL, mediaEndpoint, this.state.result)}

          <Typography>
            <em>
              <b>TIP</b>
              : For best results we recommend use a photo with 1920 x 1080px (16:9 ratio)
              image that is no larger than 2MB.
            </em>
          </Typography>
          <br />
          <br />
        </div>
        <div>
          <Field name="videoURL" component={TextField} fullWidth label="Video URL" />
          <br />
          <br />
          {this.props.videoURL && <ReactPlayer url={this.props.videoURL} width="100%" />}
          <Typography>
            <em>
              <b>TIP</b>
              : We recommend using a video as further marketing material. The accepted
              formats are <span style={{ color: '#bb0000' }}>Youtube</span>
              , <span style={{ color: '#3b5998' }}>Facebook</span>
              , or <span style={{ color: '#1ab7ea' }}>Vimeo</span>
              .
            </em>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(ownProps.form);
  return {
    logoFilename: ownProps.initialValues
      ? ownProps.initialValues.logoFilename
      : selector(state, 'logoFilename'),
    logoDestination: ownProps.initialValues
      ? ownProps.initialValues.logoDestination
      : selector(state, 'logoDestination'),
    logoURL: ownProps.initialValues ? ownProps.initialValues.logoURL : null,
    videoURL: ownProps.initialValues
      ? ownProps.initialValues.videoURL
      : selector(state, 'videoURL'),
  };
};

export default compose(
  withStyles(theme),
  graphql(uploadPhotoMutation),
  connect(
    mapStateToProps,
    null,
  ),
  reduxForm({ destroyOnUnmount: false }),
)(MediaStep);
