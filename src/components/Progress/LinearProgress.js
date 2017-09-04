import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const progressActiveKeyFrames = keyframes`
  0% {
    opacity: 0.1;
    width: 0;
  }
  20% {
    opacity: 0.5;
    width: 0;
  }
  100% {
    opacity: 0;
    width: ${props => props.value}%;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    border-radius: 10px;
    height: 100%;
    background: #fff;
    width: ${props => props.value}%;
    animation: ${progressActiveKeyFrames} 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
  }
`;

const DEFAULT_MODE = 'indeterminate';

function LinearProgress({
  size,
  type,
  value,
  className,
  children,
  mode,
  ...other
}) {
  const classnames = classNames(
    'progress',
    {
      [`is-${size}`]: size,
      [`is-${type}`]: type
    },
    className
  );
  const progress = <progress className={classnames} value={value} max="100" {...other}>{children}</progress>;
  return mode === DEFAULT_MODE ? (
    <ProgressContainer value={value}>
      {progress}
    </ProgressContainer>
  ) : progress;
}

LinearProgress.defaultProps = {
  mode: DEFAULT_MODE
};

LinearProgress.PropTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
  ]),
  mode: PropTypes.oneOf(['determinate', 'indeterminate']),
  value: PropTypes.number.isRequired,
};

export default LinearProgress;
