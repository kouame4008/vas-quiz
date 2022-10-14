import useSWR from 'swr'
import { LISTE_CATEGORIES_URL } from '../config/ApiRouter';
import { liste_categories } from './categorie-actions';

export const useCategorie = () => {
    const { data, mutate } = useSWR(LISTE_CATEGORIES_URL, liste_categories);

    // render data
    return {
        categories: data && data.categories,
        chargementCategories: !data,
        mutateCategories: mutate
    }
}

export default useCategorie