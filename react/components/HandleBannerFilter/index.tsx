import { useEffect } from "react";
import { useRuntime } from "vtex.render-runtime";

function HandleBannerFilter() {
    const { route } = useRuntime();

    useEffect(() => {
        const bannerElement = document.querySelector('.vtex-flex-layout-0-x-flexRow--banner-and-list') as HTMLElement;
        
        if (!bannerElement) return;

        console.log('route.query:', route);

        //@ts-ignore
        const hasFilter = route.query || route?.queryString?.query;

        if (hasFilter) {
            // Oculta o banner quando há filtros
            bannerElement.style.display = 'none';
        } else {
            // Exibe o banner quando não há filtros
            bannerElement.style.display = '';
        }

    }, [route]);

    return null;
}


export default HandleBannerFilter;
