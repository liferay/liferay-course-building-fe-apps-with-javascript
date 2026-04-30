import React, { useRef, useState, useEffect } from 'react';
import BarChart from './BarChart';

const LiferayChart = ({ title, datasetLabel, aggregationField, aggregationType, restContextPath, color }) => {

    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    const pageSize = 2;
    const runIdRef = useRef(0);

    function fetchData(page, currentCountAggregation, runId) {
        window.Liferay.Util.fetch(`${restContextPath}?fields=${aggregationField}&page=${page}&pageSize=${pageSize}`)
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Expected JSON but received: ${contentType}`);
            }
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(json => {

            if(runIdRef.current === runId) {

                if(aggregationType == "count") {

                        const countAggregation = mergeCounts(currentCountAggregation, countBy(json.items, aggregationField));
                        const keys = Object.keys(countAggregation);
                        setLabels(keys);
                        setValues(keys.map(k => countAggregation[k]));              

                        if(page < json.lastPage && runIdRef.current == runId) {
                            fetchData(page+1, countAggregation, runId);
                        }

                } // We could manage other aggregation types, like sums or averages...

            }
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        const runId = ++runIdRef.current;
        if(restContextPath) {            
            fetchData(1, {}, runId);            
        }
    }, [restContextPath, aggregationField, aggregationType]);

    return (
        <>

            <BarChart
                title={title}
                datasetLabel={datasetLabel}
                labels={labels}
                values={values}
                color={color}
            />

        </>
    );
};

export default LiferayChart;