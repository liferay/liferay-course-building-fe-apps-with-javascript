/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

export { default as distributors } from './distributors-data';

const api = async (url, options = {}) => {
    return fetch(window.location.origin + '/' + url, {
        headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': Liferay.authToken,
        },
        ...options,
    });
};

const API_KEY = YOUR_API_KEY;
const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export async function getDistributorLatLng(address) {

    // use geocoding API

    // Encode the address to make it URL-safe
    const encodedAddress = encodeURIComponent(address);
    const requestUrl = `${API_URL}?address=${encodedAddress}&key=${API_KEY}`;

    try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check the API status and results
        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            // Handle cases where the address is not found
            throw new Error(`Geocoding failed. Status: ${data.status}`);
        }
    } catch (error) {
        console.error("Could not get coordinates:", error);
        // Rethrow the error or return a specific error object
        throw error;
    }
}

export async function getDistributorDetails(id) {

    // use headless to fetch data

    try {
        const response = await api('o/c/distributorlocations/' + id);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching distributor with id: " + id, error);

        return {};
    }
}

export async function getDistributors() {

    // load the complete list of distributors from the headless API

    try {
        const response = await api('o/c/distributorlocations/');
        const data = await response.json();
        
        return data.items;
        
    } catch (error) {
        console.error("Error fetching distributors:", error);

        return []; 
    }
}

