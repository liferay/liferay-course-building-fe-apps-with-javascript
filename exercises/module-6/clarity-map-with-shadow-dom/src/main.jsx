import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import leafletCssText from "leaflet/dist/leaflet.css?inline";

class WebComponent extends HTMLElement {
  
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    const leafletStyle = document.createElement("style");
    leafletStyle.textContent = leafletCssText;
    this.shadow.appendChild(leafletStyle);

    this.mountPoint = document.createElement("div");
    this.shadow.appendChild(this.mountPoint);

    this.root = createRoot(this.mountPoint);

    this.renderReact();
  }

  disconnectedCallback() {
    this.mo?.disconnect();
    this.root?.unmount();
    this.root = null;
  }

  getMapItems() {
    return Array.from(this.querySelectorAll("map-item")).map((el, index) => {
      return {
        id: el.getAttribute("id") ?? `item-${index}`,
        latitude: el.getAttribute("latitude"),
        longitude: el.getAttribute("longitude"),
        _el: el,
      };
    });
  }

  renderReact() {
    this.root.render(
      <StrictMode>
        <App items={this.getMapItems()} hostElement={this} />
      </StrictMode>
    );
  }
}

const ELEMENT_ID = "clarity-custom-element-map-with-slots";
if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}
