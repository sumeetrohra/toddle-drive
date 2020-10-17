import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import dirData from "./dirData.json";
import { BreadCrumb, Container, NavigatorWindow } from "./components";

function App() {
	const [path, setPath] = useState("root");
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<Container>
			<BreadCrumb
				dirData={dirData}
				setPath={setPath}
				path={path}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<NavigatorWindow
				searchTerm={searchTerm}
				dirData={dirData}
				setPath={setPath}
				path={path}
				setSearchTerm={setSearchTerm}
			/>
		</Container>
	);
}

export default App;
