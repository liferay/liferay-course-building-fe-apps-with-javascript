import React, { useEffect, useState } from 'react';

const DistributorTable = () => {
    const [distributors, setDistributors] = useState([]);

    useEffect(() => {
        setDistributors([
            { id: 1, name: 'Warby Parker', street: '11700 Domain Blvd Suite 114', city: 'Austin', state: 'TX', zipCode: '78758', tier: {key: 'gold', name: 'Gold'}, position: {lat: 30.402968, lng: -97.720991} },
            { id: 2, name: 'ClearView Optics', street: '1980 East State Hwy 114', city: 'Southlake', state: 'TX', zipCode: '76092', tier: {key: 'bronze', name: 'Bronze'}, position: {lat: 32.945113, lng: -97.121117} },
            { id: 3, name: 'Stanton Optical', street: '3620 W University Dr #400', city: 'McKinney', state: 'TX', zipCode: '75071', tier: {key: '', name: ''}, position: {lat: 33.217463, lng: -96.660282} },
            { id: 4, name: 'Roka', street: '5646 Milton St. Suite 540', city: 'Dallas', state: 'TX', zipCode: '75206', tier: {key: 'silver', name: 'Silver'}, position: {lat: 32.848092, lng: -96.770822} }
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