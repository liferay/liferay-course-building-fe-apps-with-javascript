import React, { useEffect, useState } from 'react';
import ClayAlert from '@clayui/alert';
import ClayButton from '@clayui/button';

const DistributorDetails = () => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        Liferay.on('selectDistributor', (dist) => {
            setSelected(dist);
        });
    }, []);

    if (!selected) {
        return (
            <ClayAlert displayType="info" title="Info:">
                Please select a distributor from the table.
            </ClayAlert>
        );
    }

    return (
        <div class="row">
            <div class="col">
                <h2>{selected.name}</h2>
                <p>
                    Location: {selected.city}, {selected.state}
                </p>
            </div>
            
            <div class="col">                
                <ClayButton displayType="primary">
                    Contact Distributor
                </ClayButton>
            </div>
        </div>
    );
};

export default DistributorDetails;
