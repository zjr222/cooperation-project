import React, { Component } from 'react'
import styles from './index.module.css'
import * as data from '../../services/getData'
import { withRouter } from 'react-router-dom'
import { Radio, Pagination, Spin } from 'antd';
import { connect } from 'react-redux'
import CommentComp from '../CommonComp/CommentComp'

class MovieComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            moreComment: null,
            value: 1, //评价的值
            allComment: null, //全部留言
            title: null,
            start: 20 //初始页面请求的20个数据
        }
    }

    //复用结构组件
    getDomData(data, maxVal, minVal) {
        const dt = data.filter(a => {
            return minVal ? a.rate <= maxVal && a.rate >= minVal : (maxVal === 6 ? a.rate < maxVal : a.rate > maxVal);
        })
        return dt.map((k, v) => {
            return (
                <div key={v} className={styles.all}>
                    <div className={styles.avatar}>
                        <img src={k.img} alt="" />
                    </div>
                    <CommentComp name={k.name} rate={k.rate} date={k.date} content={k.content} useful={k.useful} />
                </div>
            )
        })
    }
    //复用组件
    getPageData(start, id) {
        data.default.getAllCommentsInMovie({
            id,
            start,
        }).then(r => {
            if (this.state.value === 1) {
                const more = this.getDomData(r, 0)
                this.setState({
                    moreComment: more
                })
            }
            else if (this.state.value === 2) {
                const more = this.getDomData(r, 8)
                this.setState({
                    moreComment: more
                })
            } else if (this.state.value === 3) {
                const more = this.getDomData(r, 8, 6)
                this.setState({
                    moreComment: more
                })
            } else {
                const more = this.getDomData(r, 6)
                this.setState({
                    moreComment: more
                })
            }
        })
    }
    componentDidMount() {
        console.log(this.props)
        this.getPageData(this.state.start, this.props.match.params.id);
        this.setState({
            title:this.props.location.state
        })
    }
    onChangePage(pageNumber) {
        this.props.history.push(`/comment/${this.props.match.params.id}/start=${this.state.start * pageNumber}&limit=20&status=P&sort=new_score`)
        this.getPageData(this.state.start * pageNumber, this.props.match.params.id)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className={styles.container}>
                    <h1 className={styles.h1}>{`${this.state.title}短评`}</h1>
                    <div className={styles.comments}>
                        <div className={styles.radio}>
                            <Radio.Group onChange={(e) => {
                                this.setState({
                                    value: e.target.value
                                });
                                this.getPageData(this.state.start, this.props.match.params.id);
                            }} value={this.state.value}>
                                <Radio value={1}>全部</Radio>
                                <Radio value={2}>好评</Radio>
                                <Radio value={3}>一般</Radio>
                                <Radio value={4}>差评</Radio>
                            </Radio.Group>
                        </div>
                        {this.state.moreComment}
                    </div>
                    <div className={styles.pagination}>
                        <Pagination showQuickJumper defaultCurrent={1} total={140799} onChange={(pageNumber) => {
                            this.onChangePage(pageNumber, this.state.state, this.state.query)
                        }} />
                    </div>

                </div>
            )
        } else {
            return (
                <div className={styles.cont}>
                    <div className={styles.spin}>
                        <Spin tip="Loading..." delay="2000" size="large" />
                    </div>
                </div>
            )
        }

    }

}


export default connect()(withRouter(MovieComment));