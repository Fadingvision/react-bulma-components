import React, { Component } from 'react';
import BScroll from 'better-scroll';
import Loading from '../Loading';

export default class PullUp extends Component {
  static defaultProps = {
    pullUpLoad: {
      moreTxt: '加载更多...',
      noMoreTxt: '没有更多数据',
    },
    pullDownRefresh: false,
    handlePullUpLoad: () => {},
    handlePullDownRefresh: () => {}
  };

  state = {
    isPullingUpLoad: false,
    hasMoreData: true,
  };

  componentDidMount() {
    this.scroll = new BScroll(this.scrollContainer, {
      pullUpLoad: this.props.pullUpLoad,
      click: true,
      pullDownRefresh: this.props.pullDownRefresh
    });

    // 开始上拉加载，此时应该通知父元素加载数据
    if (this.props.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        if (!this.state.hasMoreData) return;
        this.setState({
          isPullingUpLoad: true
        }) // 用于展现页面loading效果
        this.props.handlePullUpLoad();
      });
    }
    if (this.props.pullDownRefresh) {
      // 开始下拉刷新，此时应该通知父元素加载数据
      this.scroll.on('pullingDown', () => {
        this.iPullingDown = true; // 用于展现页面loading效果
        this.props.handlePullDownRefresh();
      });
    }
  }

  componentWillUnmount() {
    this.scroll.destroy();
  }

  finish = (hasMoreData = true) => {
    this.setState({
      isPullingUpLoad: false,
      hasMoreData,
    })
    // 终止上拉加载并重新计算scroll
    if (this.props.pullUpLoad) this.scroll.finishPullUp();
    // 终止下拉刷新并重新计算scroll
    if (this.props.pullDownRefresh) this.scroll.finishPullDown();
    this.scroll.refresh();
  }

  render() {
    const { pullUpLoad } = this.props;
    const { isPullingUpLoad, hasMoreData } = this.state;
    const pullUpTxt = hasMoreData ? pullUpLoad.moreTxt : pullUpLoad.noMoreTxt;
    // 只有到父元素指定高度，并且子元素内容超过父元素高度的时候，
    // 才会出现纵向滚动
    return (
      <div
        className={this.props.className}
        ref={ins => {
          this.scrollContainer = ins;
        }}
      >
        <div className="pull-more">
          {this.props.children}
          {
            pullUpLoad &&
            <div className="pullup-wrapper" >
              {
                !isPullingUpLoad &&
                <div className="before-trigger">
                  <span>{pullUpTxt}</span>
                </div>
              }
              {
                isPullingUpLoad &&
                <div className="after-trigger">
                  <Loading />
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}
