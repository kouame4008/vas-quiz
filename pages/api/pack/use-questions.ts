import { LISTE_QUESTION_PAR_SOUSCRIPTION_URL } from './../config/ApiRouter';
import useSWR from 'swr'
import { liste_packs } from './pack-actions';

export const useListQuestions = (souscription_id: string) => {
    const { data, mutate } = useSWR(`${LISTE_QUESTION_PAR_SOUSCRIPTION_URL}/${souscription_id}/questions`, liste_packs, {
        refreshInterval: 70000
    });

    // render data
    return {
        questions: data && data.questions,
        chargementQuestions: !data,
        mutateQuestions: mutate
    }
}

export default useListQuestions