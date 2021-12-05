import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { FormattedMessage,  useIntl } from "react-intl";

function PieChart(props) {

    const intl = useIntl();
    
    const {
        data,
        outerRadius,
        innerRadius,
    } = props;

    console.log(data);

    const margin = {
        top: 50, right: 50, bottom: 50, left: 50,
    };

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3     
        .scaleSequential()      
        .interpolator(d3.interpolateCool)      
        .domain([0, data.length]);

    useEffect(() => {
        drawChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    function returnInternacionalizationId(name){
        if(name==="Living room"){
            return "living"
        }
        else if(name === "Kitchen"){
            return "kitchen"
        }
        else if(name === "Dinner room"){
            return "dinner"
        }
    }


    function drawChart() {
        // Remove the old svg
        d3.select('#pie-container')
        .select('svg')
        .remove();

        // Create new svg
        const svg = d3
        .select('#pie-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const arcGenerator = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

        const pieGenerator = d3
        .pie()
        .padAngle(0)
        .value((d) => d.powerUsage.value);

        const arc = svg
        .selectAll()
        .data(pieGenerator(data))
        .enter();

        var tooltip = d3.select("#pie-container")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        function mouseOverRoom() {
            tooltip
                .style("opacity", 1)

            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1.5)
                .style('stroke-width', 1.5)
        }

        function mouseMoveRoom(e, d) {
            const name = intl.formatMessage(({id: `${returnInternacionalizationId(d.data.name)}`}))
            tooltip
                .html(name +": " + d.data.powerUsage.value + " KwH")
                .style("left", (e.pageX)+ 10 + "px")
                .style("top", (e.pageY)- 25 + "px")
                .style("display", "inline-block")
        }

    function mouseLeaveRoom() {
        tooltip
            .style("opacity", 0)
            .style("display", "none")

        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 1)
            .style('stroke-width', 0)         
        }      
        

        // Append arcs
        arc
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (_, i) => colorScale(i))
            .style('stroke', '#ffffff')
            .style('stroke-width', 0)
            .on("mouseover", mouseOverRoom)
            .on("mousemove", mouseMoveRoom)
            .on("mouseleave", mouseLeaveRoom)
        
    }    

    return <div className="container-fluid">
                {data.length> 0?
                    <>
                        <div className="d-flex justify-content-center">
                            <h5>
                                <FormattedMessage id="pieChartTitle" />
                            </h5>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div id="pie-container" />
                        </div>
                    </>
                    : <div> </div>}         
            </div>
}

export default PieChart;