import { all, append, BaseHTMLElement, customElement, elem, first, onWin } from 'dom-native';
import { split } from 'utils-min';
import './init-tslib';


@customElement('spec-main-view')
class SpecMainView extends BaseHTMLElement {
	private specNames!: string[];


	init() {
		this.specNames = split(this.getAttribute('specs') ?? '', ',');
		this.innerHTML = _render(this.specNames);
		this.refresh();
		const pageName = this.getAttribute('page');
		first(this, `header > a.item.${pageName}`)?.classList.add('sel');

	}

	@onWin('hashchange')
	onHashChange() {
		this.refresh();
	}

	refresh() {
		let name = window.location.hash;
		if (!name) {
			window.location.hash = `#spec-${this.specNames[0]}`;
			return;
		}
		all(this, 'nav a.sel').forEach(a => a.classList.remove('sel'));

		if (name) {
			name = name.substring(1); // remove the first #

			// update content
			document.title = `Test - ${name}`;
			const mainEl = first(this, 'main')!;
			mainEl.innerHTML = '';
			const el = append(mainEl, elem(name));
			el.classList.add('spec-view');

			// update nav
			const select = `nav a[href="#${name}"]`;
			const aEl = first(this, select);
			if (aEl) {
				aEl.classList.add('sel');
			} else {
				console.log(`WARNING - cannot find nav a for '${select}'`);
			}
		}

	}
}




function _render(specNames: string[]) {
	return `
	<header>
		<h1>dom-native</h1>
		<span></span>
		<a class="item draggable" href="https://demo.dom-native.org/draggable/index.html">@dom-native/draggable</a>
		<a class="item ui" href="https://demo.dom-native.org/ui/index.html">@dom-native/ui</a>
	</header>
	<nav>
	${specNames.map((name) => `<a href="#spec-${name}">${name}</a>`).join('\n')}
	</nav>
	<main> 
	</main>
	<aside id='console'></aside>
	`
}