import { useEffect } from 'react';
import skillswapIcon from '../skillswap_icon.png';

export function usePageMeta(pageName) {
	useEffect(() => {
		if (pageName) {
			document.title = `SkillSwap - ${pageName}`;
		}

		let link = document.querySelector("link[rel='icon']");
		if (!link) {
			link = document.createElement('link');
			link.setAttribute('rel', 'icon');
			document.head.appendChild(link);
		}
		link.setAttribute('href', skillswapIcon);
	}, [pageName]);
}
