import React, { useEffect, useState } from 'react';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
const DistributorTable = () => {
    const [distributors, setDistributors] = useState([]);

    useEffect(() => {
        setDistributors([
            { id: 1, name: 'Vision World', city: 'Austin', state: 'TX' },
            { id: 2, name: 'ClearView Optics', city: 'Dallas', state: 'TX' },
            { id: 3, name: 'FocusPlus', city: 'Houston', state: 'TX' }
        ]);
    }, []);

    const handleSelect = (distributor) => {
        Liferay.fire('selectDistributor', distributor);
    };

    return (
        <table>
            <tr>
                <th>Name</th>
                <th>City</th>
                <th>State</th>
                <th>Action</th>
            </tr>
            {distributors.map((dist) => (
                <tr>
                    <td>{dist.name}</td>
                    <td>{dist.city}</td>
                    <td>{dist.state}</td>
                    <td>
                        <button
                            onClick={() => handleSelect(dist)}
                        >
                            View Details
                        </button>
                    </td>
                </tr>
            ))}
        </table>
    );
};

export default DistributorTable;