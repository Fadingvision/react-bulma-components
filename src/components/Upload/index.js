import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Upload extends Component {
  static defaultProps = {
    maxSize: 10
  };

  static propTypes = {
    handleFileChange: propTypes.func.isRequired
  };

  handleFileChange = () => {
    const file = this.uploadElement.files[0];
    const size = file.size / 1024 / 1024;
    if (size > this.props.maxSize) {
      this.props.handleFileChange(null, `文件大小不能超过${this.props.maxSize}MB`)
      this.uploadElement.value = '';
      return false;
    }

    const formData = new FormData();
    formData.append('file', file);
    return this.props.handleFileChange(formData)
  };

  render() {
    return (
      <div
        onClick={() => {
          if (this.uploadElement) this.uploadElement.click();
        }}
        className={this.props.className}
      >
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={this.handleFileChange}
          ref={fileEl => {
            this.uploadElement = fileEl;
          }}
        />
        {this.props.children}
      </div>
    );
  }
}
