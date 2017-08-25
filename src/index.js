import { h, render } from 'preact';
import App from './app';

render(<App />, document.body);

if (process.env.NODE_ENV !== 'production') {
	import('preact/devtools');
}
