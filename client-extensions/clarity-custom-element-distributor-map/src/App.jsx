import React, { useState } from 'react'
import './App.css'
import Map from "./components/Map.jsx";

function App(props) {
	const [count, setCount] = useState(0)

	const promoStoreValue = props.promoStore;

	return (
		<>
			<Map promoStore={promoStoreValue}/>
		</>
	)
}

export default App
