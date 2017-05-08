/**
 * Created by dyk on 2017/1/14.
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {Input, Button, Icon, Popover, Spin, message} from 'antd'
import {connect} from 'react-redux'
import DragContent from './DragContent.jsx'
import CodeContent from './CodeContent.jsx'
import ChartStyle from './ChartStyle.jsx'
import editorAction from '../actions/editorAction';
import config from '../config'

const mapStateToProps = (state) => ({
    editorType: state.editorType,
    dataSet: state.dataSet,
    chartSet: state.chartSet,
    chart: state.chart
})

const mapDispatchToProps = (dispatch) => (bindActionCreators(editorAction,dispatch))

class EditorUI extends Component {
    static propTypes = {
        dataSet: PropTypes.object,
        chart: PropTypes.object,
        setDataSetType: PropTypes.func,
        getChart: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }//初始化 state

    componentWillMount() {
        this.props.getCodeData(config.request.id,this.props.editorType,() => {
            setTimeout(this.props.getChart,500)
            this.setState({loading:false})
        })
    }//插入 DOM 前

    render() {
        const {setDataSetType, setChartSetTitle, getChart, chartSet, editorType, saveChart} = this.props
        const setChartType = (type) => {
            setDataSetType(type)
            getChart()
        }
        return (
            <Spin spinning={this.state.loading}>
                <div className='wrapper'>
                    <header>
                        <div className="logo"/>
                    </header>
                    {editorType === 'drag' && <DragContent/>}
                    {editorType === 'code' && <CodeContent/>}
                    <aside className="right-aside">
                        <div className="chart-set-panel">
                            <Button className="chart-set-save" type="primary" size="large" onClick={() => saveChart(() => message.success('保存成功！'))}>保存</Button>
                            <hr/>
                            <div className="chart-set-title-label">
                                <Icon type="credit-card"/> 图表标题
                                <br/>
                                <Input className="chart-set-title" size="large" placeholder="请输入图表名称"
                                       value={chartSet.title} onChange={(event) => setChartSetTitle(event.target.value)}/>
                            </div>
                            <hr/>
                            <div className="chart-set-select">
                                <Popover placement="leftTop" content={
                                    <div className="chart-set-select-item chart-set-select-table">
                                        <div className="chart-set-select-" onClick={() => setChartType("table")}></div>
                                    </div>
                                }>
                                    <Button icon="appstore" type="ghost" size="large">表&nbsp;&nbsp;&nbsp;格</Button>
                                </Popover>
                                <Popover placement="leftTop" content={
                                    <div className="chart-set-select-item chart-set-select-line">
                                        <div className="chart-set-select-line-stack"
                                             onClick={() => setChartType("line-stack")}></div>
                                        <div className="chart-set-select-area-stack"
                                             onClick={() => setChartType("area-stack")}></div>
                                    </div>
                                }>
                                    <Button icon="line-chart" type="ghost" size="large">折线图</Button>
                                </Popover>
                                <Popover placement="leftTop" content={
                                    <div className="chart-set-select-item chart-set-select-bar">
                                        <div className="chart-set-select-bar-tick-align"
                                             onClick={() => setChartType("bar-tick-align")}></div>
                                        <div className="chart-set-select-bar-y-category"
                                             onClick={() => setChartType("bar-y-category")}></div>
                                    </div>
                                }>
                                    <Button icon="bar-chart" type="ghost" size="large">柱状图</Button>
                                </Popover>
                                <Popover placement="leftTop" content={
                                    <div className="chart-set-select-item chart-set-select-pie">
                                        <div className="chart-set-select-pie-simple"
                                             onClick={() => setChartType("pie-simple")}></div>
                                        <div className="chart-set-select-pie-doughnut"
                                             onClick={() => setChartType("pie-doughnut")}></div>
                                    </div>
                                }>
                                    <Button icon="pie-chart" type="ghost" size="large">饼&nbsp;&nbsp;&nbsp;图</Button>
                                </Popover>
                                { false && <Popover placement="leftTop" content={
                                    <div className="chart-set-select-item chart-set-select-strip">
                                    </div>
                                }>
                                    <Button icon="menu-unfold" type="ghost" size="large">条线图</Button>
                                </Popover>}
                                { false && <Popover placement="leftTop" content={
                                    <div className="chart-set-select-item chart-set-select-filter">
                                    </div>
                                }>
                                    <Button icon="filter" type="ghost" size="large">漏斗图</Button>
                                </Popover>}
                                <Popover placement="leftTop" content={
                                    <div className="chart-set-select-item chart-set-select-map">
                                        <div className="chart-set-select-map-china-dataRange"
                                             onClick={() => setChartType("map-china-dataRange")}></div>
                                    </div>
                                }>
                                    <Button icon="environment" type="ghost" size="large">地&nbsp;&nbsp;&nbsp;图</Button>
                                </Popover>
                            </div>
                            <hr/>
                            <ChartStyle refresh={() => {}}/>
                        </div>
                    </aside>
                </div>
            </Spin>
        )
    }
}

const Editor = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorUI)

export default Editor