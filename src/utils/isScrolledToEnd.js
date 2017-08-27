/* this functions copypasted from internet, not going to format the code */
function getScrollXY() {
	let a = 0, b = 0; return "number" === typeof window.pageYOffset ? (b = window.pageYOffset, a = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (b = document.body.scrollTop, a = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (b = document.documentElement.scrollTop, a = document.documentElement.scrollLeft), [a, b];
}

function getDocHeight() {
	let a = document; return Math.max(a.body.scrollHeight, a.documentElement.scrollHeight, a.body.offsetHeight, a.documentElement.offsetHeight, a.body.clientHeight, a.documentElement.clientHeight);
}

export default function isScrolledToEnd() {return getDocHeight() === getScrollXY()[1] + window.innerHeight; }

