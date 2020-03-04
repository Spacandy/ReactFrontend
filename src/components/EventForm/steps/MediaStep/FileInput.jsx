import React from 'react';
import ReactDOM from 'react-dom';

export default class FileInput extends React.Component {
  UNSAFE_componentWillMount() {
    const win = typeof window === 'object' ? window : {};
    if (
      typeof window === 'object' &&
      (!win.File || !win.FileReader || !win.FileList || !win.Blob)
    ) {
      console.warn(
        '[react-file-reader-input] Some file APIs detected as not supported.' +
          ' File reader functionality may not fully work.',
      );
    }
  }

  formattedAspectRatio = (width, height) => {
    const gcd = (a, b) => {
      return b ? gcd(b, a % b) : a;
    };
    const divisor = gcd(width, height);

    return `${width / divisor}:${height / divisor}`;
  };
  bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  };
  handleChange = e => {
    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Convert to Array.
      files.push(e.target.files[i]);
    }

    // Build Promise List, each promise resolved by FileReader.onload.
    Promise.all(
      files.map(
        file =>
          new Promise((resolve, reject) => {
            let reader = new FileReader();

            this.props.change('logoSize', this.bytesToSize(file.size));
            reader.onload = result => {
              // Resolve both the FileReader result and its original file.
              var image = new Image();

              image.src = reader.result;

              image.onload = () => {
                this.props.change('logohHeight', image.height);
                this.props.change('logoWidth', image.height);
                this.props.change(
                  'logoFormattedAspectRatio',
                  this.formattedAspectRatio(image.width, image.height),
                );
                this.props.change('logoComputedAspectRatio', image.width / image.height);
              };

              resolve([result, file]);
            };

            // Read the file with format based on this.props.as.
            switch ((this.props.as || 'url').toLowerCase()) {
              case 'binary': {
                reader.readAsBinaryString(file);
                break;
              }
              case 'buffer': {
                reader.readAsArrayBuffer(file);
                break;
              }
              case 'text': {
                reader.readAsText(file);
                break;
              }
              case 'url': {
                reader.readAsDataURL(file);
                break;
              }
            }
          }),
      ),
    ).then(zippedResults => {
      // Run the callback after all files have been read.
      this.props.onChange(e, zippedResults);
    });
  };

  triggerInput = e => {
    ReactDOM.findDOMNode(this._reactFileReaderInput).click();
  };

  render() {
    const hiddenInputStyle = this.props.children
      ? {
          // If user passes in children, display children and hide input.
          position: 'absolute',
          top: '-9999px',
        }
      : {};

    const { as, style, ...props } = this.props;

    return (
      <div className="_react-file-reader-input" onClick={this.triggerInput} style={style}>
        <input
          {...props}
          children={undefined}
          type="file"
          onChange={this.handleChange}
          ref={c => (this._reactFileReaderInput = c)}
          onClick={() => {
            this._reactFileReaderInput.value = null;
          }}
          style={hiddenInputStyle}
        />
        {this.props.children}
      </div>
    );
  }
}
