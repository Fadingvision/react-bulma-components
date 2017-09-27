import React, { Component } from 'react';
import BScroll from 'better-scroll';

export default class PullMore extends Component {
  static defaultProps = {
    pullUpLoad: true,
    pullDownRefresh: true,
    handlePullUpLoad: () => {},
    handlePullDownRefresh: () => {}
  };

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollContainer, {
      pullUpLoad: this.props.pullUpLoad,
      pullDownRefresh: this.props.pullDownRefresh
    });

    // 开始上拉加载，此时应该通知父元素加载数据
    if (this.props.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true; // 用于展现页面loading效果
        this.props.handlePullUpLoad().then(this.finish);
      });
    }
    if (this.props.pullDownRefresh) {
      // 开始下拉刷新，此时应该通知父元素加载数据
      this.scroll.on('pullingDown', () => {
        this.iPullingDown = true; // 用于展现页面loading效果
        this.props.handlePullDownRefresh().then(this.finish);
      });
    }
  }

  componentWillUnmount() {
    this.scroll.destory();
  }

  finish() {
    // 终止上拉加载并重新计算scroll
    if (this.props.pullUpLoad) this.scroll.finishPullUp();
    // 终止下拉刷新并重新计算scroll
    if (this.props.pullDownRefresh) this.scroll.finishPullDown();
    this.scroll.refresh();
  }

  render() {
    // 只有到父元素指定高度，并且子元素内容超过父元素高度的时候，
    // 才会出现纵向滚动
    return (
      <div
        className="scroll-container"
        ref={ins => {
          this.scrollContainer = ins;
        }}
      >
        <ul className="pull-more">
          {this.props.children}
        </ul>
      </div>
    );
  }
}
