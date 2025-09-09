import React, { useEffect, useState } from 'react';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import { getDistributors } from 'clarity-distributors-api';

const DistributorTable = () => {

    const [distributors, setDistributors] = useState([]);

    const handleSelect = (distributor) => {
        Liferay.fire('selectDistributor', distributor);
    };

    useEffect(() => {
        getDistributors()
            .then((response) => setDistributors(response));
    }, []);

    return (
        <ClayTable>
            <ClayTable.Head>
                <ClayTable.Row>
                    <ClayTable.Cell headingCell>Name</ClayTable.Cell>
                    <ClayTable.Cell headingCell>City</ClayTable.Cell>
                    <ClayTable.Cell headingCell>State</ClayTable.Cell>
                    <ClayTable.Cell headingCell>Action</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                {distributors.map((dist) => (
                    <ClayTable.Row key={dist.id}>
                        <ClayTable.Cell>{dist.name}</ClayTable.Cell>
                        <ClayTable.Cell>{dist.city}</ClayTable.Cell>
                        <ClayTable.Cell>{dist.state}</ClayTable.Cell>
                        <ClayTable.Cell>
                            <ClayButton
                                displayType="secondary"
                                small
                                onClick={() => handleSelect(dist)}
                            >
                                View Details
                            </ClayButton>
                        </ClayTable.Cell>
                    </ClayTable.Row>
                ))}
            </ClayTable.Body>
        </ClayTable>
    );
};

export default DistributorTable;