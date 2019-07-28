import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortfolioIntraday } from '../../../actions/portfolio';

// import d3
import * as d3 from 'd3';

// Styles
import './ChartSandbox.scss';

//const width = 500;
//const height = 350;
//const margin = 20;
const margin = 50;
const width = window.innerWidth / 2;
const height = window.innerHeight / 2; 




class ChartSandbox extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPortfolioIntraday(['AMZN', 'FB']);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.portfolioIntradayData !== this.props.portfolioIntradayData) {
            //
        }
    }

    render() {
        const { portfolioIntradayData } = this.props;
        const h = height - 2;
        const w = width - 2;
        
        // Give our data the proper shape
        let data = [];
        Object.entries(portfolioIntradayData).map(keyValPair => {
            data.push({
                'time': new Date(keyValPair[0]).getTime() / 100000,
                'price': keyValPair[1]
            });
        }).reverse();

        // Find data range
        const xMin = d3.min(data, d => {
            return d['time'];
        });

        const xMax = d3.max(data, d => {
            return d['time'];
        });

        const yMin = d3.min(data, d => {
            return d['price'];
        });

        const yMax = d3.max(data, d => {
            return d['price'];
        });
      

        // Scales for the chart
        const xScale = d3
            .scaleTime()
            .domain([xMin, xMax])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([yMin, yMax])
            .range([height, 0]);

      

        // Generates price line chart when called
        const line = d3
            .line()
            .x(d => {
                return xScale(d['time']);
            })
            .y(d => {
                return yScale(d['price']);
            });
        
        console.log(data);
        
        return (
            <div
                id="chart-sandbox" 
                style={{
                padding: '5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <svg width={width} height={height}>
                {/*
                <line className="axis" x1={margin} x2={w} y1={h} y2={h}/>
                <line className="axis" x1={margin} x2={margin} y1={margin} y2={h}/>
                */}
                
                {
                    line(data) !== null ? (
                        <path d={line(data)}/>
                    ) : ''
                }
            </svg>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    portfolioIntradayData: state.portfolio.portfolioIntradayData
});

const mapDispatchToProps = dispatch => ({
    getPortfolioIntraday: symbolsArray => dispatch(getPortfolioIntraday(symbolsArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartSandbox);