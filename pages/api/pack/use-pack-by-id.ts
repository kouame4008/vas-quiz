import { SELECTIONNER_PACK_BY_ID_URL } from './../config/ApiRouter';
import useSWR from 'swr'
import { liste_packs } from './pack-actions';

export const usePacksById = (packId: string | undefined) => {
    const { data, mutate } = useSWR(`${SELECTIONNER_PACK_BY_ID_URL}/${packId}`, liste_packs);

    // render data
    return {
        pack: data && data.pack,
        chargementPack: !data,
        mutatePack: mutate
    }
}

export default usePacksById