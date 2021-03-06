import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class Modal extends Component {
  // select body element to add Modal component too
  bodyElm = document.querySelector('body');

  handleCloseClick = () => {
    this.props.onClose();
  };

  // check for Escape key press
  handleKeyPress = event => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.handleCloseClick();
    }
  };

  // add event listener for escape key
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  // remove event listener for escape key
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const { children, title, actions } = this.props;

    return ReactDOM.createPortal(
      <div className="fd-ui__overlay fd-overlay fd-overlay--modal">
        <div className="modal-demo-bg">
          <div className="fd-modal">
            <div className="fd-modal__content" role="document">
              <div className="fd-modal__header">
                <h1 className="fd-modal__title">{title}</h1>
                <button
                  className="fd-button--light fd-modal__close"
                  aria-label="close"
                  onClick={this.handleCloseClick}
                />
              </div>
              <div className="fd-modal__body">{children}</div>
              {actions ? (
                <footer className="fd-modal__footer">
                  <div className="fd-modal__actions">{actions}</div>
                </footer>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>,
      this.bodyElm
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string.isRequired
};
