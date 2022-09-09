import React from 'react'; // 在tsconfig中未设置allowSyntheticDefaultImports: true，则需要使用import * as React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const App = () => {
	return (
		<div>
			<h1>Hello!</h1>
			<h2>Welcome to your First React App!</h2>
		</div>
	);
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
