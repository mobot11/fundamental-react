import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const FormGroup = props => {
  const { children } = props;
  return <div className="fd-form__group">{children}</div>;
};

export class InputGroup extends Component {
  constructor(props) {
    super(props);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

    this.state = {
      value: this.props.inputValue || '',
      searchValue: this.props.inputValue || ''
    };
  }

  handleUp(e) {
    e.preventDefault();
    this.setState({
      value: this.state.value + 1
    });
  }

  handleDown(e) {
    e.preventDefault();
    this.setState({
      value: this.state.value - 1
    });
  }

  handleClear(e) {
    e.preventDefault();
    this.setState({
      searchValue: ''
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchValue: e.target.value
    });
  }

  handleTextChange(e) {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const {
      inputType,
      inputId,
      inputName,
      inputPlaceholder,
      addonPos,
      addon,
      glyph,
      actions,
      compact,
      children
    } = this.props;

    switch (inputType) {
      case 'number':
        return (
          <div
            className={`fd-input-group fd-input-group--after${
              compact ? ' fd-input-group--compact' : ''
            }`}
          >
            <input
              className={`${compact ? 'fd-input fd-input--compact' : ''}`}
              type="number"
              id={inputId}
              name={inputName}
              value={this.state.value}
              onChange={this.handleTextChange}
            />
            <span className="fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--after">
              <button
                className="fd-input-group__button fd-input-group__button--step-up sap-icon--slim-arrow-up"
                aria-label="Step up"
                onClick={this.handleUp}
              />
              <button
                className="fd-input-group__button fd-input-group__button--step-down sap-icon--slim-arrow-down"
                aria-label="Step down"
                onClick={this.handleDown}
              />
            </span>
          </div>
        );

      case 'search':
        return (
          <div
            className={`fd-input-group${
              compact ? ' fd-input-group--compact' : ''
            }`}
          >
            <input
              className={`${compact ? 'fd-input fd-input--compact' : ''}`}
              type="search"
              id={inputId}
              name={inputName}
              value={this.state.searchValue}
              placeholder={inputPlaceholder}
              onChange={this.handleChange}
            />
            <span className="fd-input-group__addon fd-input-group__addon--button">
              <button
                className="fd-input-group__button fd-input-group__button--clear"
                aria-label="Clear"
                onClick={this.handleClear}
              />
            </span>
          </div>
        );
      case 'text':
      default: {
        if (addonPos === 'before') {
          return (
            <div
              className={`fd-input-group fd-input-group--before${
                compact ? ' fd-input-group--compact' : ''
              }`}
            >
              {actions ? (
                <span className="fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--before">
                  {children}
                </span>
              ) : (
                <span className="fd-input-group__addon fd-input-group__addon--before">
                  {glyph ? (
                    <span
                      className={`${'sap-icon--' + glyph}`}
                      role="presentation"
                    />
                  ) : (
                    addon
                  )}
                </span>
              )}
              <input
                className={`${compact ? 'fd-input fd-input--compact' : ''}`}
                type="text"
                id={inputId}
                name={inputName}
                value={this.state.value}
                onChange={this.handleTextChange}
              />
            </div>
          );
        } else {
          return (
            <div
              className={`fd-input-group fd-input-group--after${
                compact ? ' fd-input-group--compact' : ''
              }`}
            >
              <input
                className={`${compact ? 'fd-input fd-input--compact' : ''}`}
                type="text"
                id={inputId}
                name={inputName}
                value={this.state.value}
                onChange={this.handleTextChange}
              />
              {actions ? (
                <span className="fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--after">
                  {children}
                </span>
              ) : (
                <span className="fd-input-group__addon fd-input-group__addon--after">
                  {glyph ? (
                    <span
                      className={`${'sap-icon--' + glyph}`}
                      role="presentation"
                    />
                  ) : (
                    addon
                  )}
                </span>
              )}
            </div>
          );
        }
      }
    }
  }
}

InputGroup.propTypes = {
  inputType: PropTypes.oneOf(['text', 'number', 'search']),
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  inputValue: PropTypes.any,
  inputPlaceholder: PropTypes.string,
  addonPos: PropTypes.oneOf(['before', 'after']),
  addon: PropTypes.string,
  glyph: PropTypes.string,
  actions: PropTypes.bool,
  compact: PropTypes.bool
};
