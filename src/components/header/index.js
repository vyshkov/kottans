import { h, Component } from 'preact';
import { Link } from 'preact-router';
import './header.css';

export default class Header extends Component {
	render() {
		return (
			<header className="kottan-header">
				<nav>
					<Link href="/">Home</Link>
					<Link href="/profile">Me</Link>
					<Link href="/profile/john">John</Link>
				</nav>
			</header>
		);
	}
}
