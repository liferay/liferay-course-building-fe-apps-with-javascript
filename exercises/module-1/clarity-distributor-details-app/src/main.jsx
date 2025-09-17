import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx'
import './index.css'

class WebComponent extends HTMLElement {

	connectedCallback() {
		this.root = createRoot(this);

		this.root.render(
			<StrictMode>
				<App />
			</StrictMode>,
			this
		);
	}

	disconnectedCallback() {
		this.root.unmount();

		delete this.root;
	}
}

const ELEMENT_ID = 'clarity-distributor-details-custom-element';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
