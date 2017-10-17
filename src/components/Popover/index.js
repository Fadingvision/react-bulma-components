import React from 'react';
import ReactDOM from 'react-dom';

function PopoverContent(props) {
  const { position } = props;
  const style = {
    right: document.body.getBoundingClientRect().width + (position.width / 2) - // eslint-disable-line
      position.right + 'px',  // eslint-disable-line
    top: `${position.actualTop + position.height + 20}px`
  };
  return (
    <div>
      <div className="am-popover-mask" onClick={props.close} />
      <div
        className="am-popover fortest am-popover-placement-bottomRight"
        style={style}
      >
        <div className="am-popover-content">
          <div className="am-popover-inner">
            <div className="am-popover-item">
              <div className="am-popover-item-container">
                <span className="am-popover-item-icon" aria-hidden="true">
                  <svg>
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#popup_enquiry--fill-666"
                    />
                  </svg>
                </span>
                <span className="am-popover-item-content">采购询价</span>
              </div>
            </div>
            <div className="am-popover-item">
              <div className="am-popover-item-container">
                <span className="am-popover-item-icon" aria-hidden="true">
                  <svg>
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#popup_copy--fill-666"
                    />
                  </svg>
                </span><span className="am-popover-item-content">
                  <span className="js-copy-btn" data-clipboard-text="22">
                    复制OE号
                  </span>
                </span>
              </div>
            </div>
            <div className="am-popover-item am-popover-item-disabled">
              <div className="am-popover-item-container">
                <span className="am-popover-item-icon" aria-hidden="true">
                  <svg>
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#popup_fit--fill-666"
                    />
                  </svg>
                </span><span className="am-popover-item-content">
                  适配车型
                </span>
              </div>
            </div>
            <div className="am-popover-item">
              <div className="am-popover-item-container">
                <span className="am-popover-item-icon" aria-hidden="true">
                  <svg>
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#popup_collect--fill-f1e05a"
                    />
                  </svg>
                </span>
                <span className="am-popover-item-content">
                  <span className="collect-active">取消收藏</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const div = document.createElement('div');
document.body.appendChild(div);

export default class Popover extends React.Component {
  componentDidMount() {
    const position = this.calcuPosition();
    if (this.props.visible) {
      const component = React.createElement(PopoverContent, {
        close: this.props.close,
        position
      });
      ReactDOM.render(component, div);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.visible && this.props.visible) {
      ReactDOM.unmountComponentAtNode(div);
    } else if (newProps.visible && !this.props.visible) {
      const position = this.calcuPosition();
      const component = React.createElement(PopoverContent, {
        close: this.props.close,
        position
      });
      ReactDOM.render(component, div);
    }
  }

  calcuPosition() {
    function getElementTop(element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    }
    const target = ReactDOM.findDOMNode(this); // eslint-disable-line
    const position = target.getBoundingClientRect();
    position.actualTop = getElementTop(target);
    return position;
  }

  render() {
    return this.props.children;
  }
}
