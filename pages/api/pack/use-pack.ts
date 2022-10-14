import { LISTE_PACK_URL } from './../config/ApiRouter';
import useSWR from 'swr'
import { liste_packs } from './pack-actions';

export const usePacks = () => {
    const { data, mutate } = useSWR(LISTE_PACK_URL, liste_packs);

    // render data
    return {
        packs: data && data.packs,
        chargementPacks: !data,
        mutatePacks: mutate
    }
}

export default usePacks