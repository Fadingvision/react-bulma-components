import React, { Component } from 'react';
import BScroll from 'better-scroll';
import classNames from 'classnames';

const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18;
export default class IndexList extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0
    };
    this.touch = {};
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollContainer, {
      scrollbar: true,
      probeType: 1 // 开启才能触发scroll事件，应该是性能考虑
    });

    this.scroll.on('scroll', this.setActiveIndex);
    this.scroll.on('scrollEnd', this.setActiveIndex);
  }

  onNavTouchMove = evt => {
    const firstTouch = evt.touches[0];
    this.touch.y2 = firstTouch.pageY;
    const delta = Math.floor(
      Math.abs((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
    );
    const anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;
    this.scroll.scrollToElement(this.scrollContent.children[anchorIndex], 0);
    this.setState({
      activeIndex: anchorIndex
    });
  };

  onNavTouchStart = evt => {
    const anchorIndex = evt.target.getAttribute('data-index');
    const firstTouch = evt.touches[0];
    this.touch.y1 = firstTouch.pageY;
    this.touch.anchorIndex = anchorIndex;
    this.scroll.scrollToElement(this.scrollContent.children[anchorIndex], 0);
    this.setState({
      activeIndex: anchorIndex
    });
  };

  setActiveIndex = () => {
    const sortTop = (node1, node2) => Math.abs(node1.top) - Math.abs(node2.top);
    this.setState({
      activeIndex: this.calcuHeight().sort(sortTop)[0].index
    });
  };

  calcuHeight() {
    const childrenNodeArr = [].slice.call(this.scrollContent.children);
    return childrenNodeArr.map((child, index) => ({
      top: child.getBoundingClientRect().top,
      index
    }));
  }

  render() {
    const indexArr = this.props.data.map(item => item.index);

    // 只有到父元素指定高度，并且子元素内容超过父元素高度的时候，
    // 才会出现纵向滚动
    return (
      <div
        className="scroll-container"
        ref={ins => {
          this.scrollContainer = ins;
        }}
      >
        <ul
          className="scroll-content"
          ref={content => {
            this.scrollContent = content;
          }}
        >
          {this.props.data.map(dataItem => (
            <li key={dataItem.index}>
              <h5>{dataItem.index}</h5>
              <ul>
                {dataItem.children.map((child, index) => (
                  <li key={index}>{child.name}</li> // eslint-disable-line
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <ul
          className="index-nav"
          onTouchMove={this.onNavTouchMove}
          onTouchStart={this.onNavTouchStart}
        >
          {indexArr.map((index, arrIndex) => (
            <li
              key={index}
              data-index={arrIndex}
              className={classNames({
                active: this.state.activeIndex === arrIndex
              })}
            >
              {index}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
