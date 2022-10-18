import { NextPage } from 'next';
import Image from 'next/image';
import * as React from 'react';
import { IntoTitle } from '../../shared/components/welcome-css';
import LayoutBlanc from '../../shared/layouts/LayoutBlanc';
import IconReglement from '../../public/assets/reglement.png';
import { PageHeader } from 'antd';


const Reglement: NextPage = () => {
    return (
        <LayoutBlanc>
            <PageHeader
                title={<IntoTitle style={{ fontSize: '26px', color: '#004E9C', textAlign: 'center' }}>
                    Règlement général et conditions d’utilisation
                </IntoTitle>}
                onBack={()=>{}}
            />
            <div className='mt-3'>

                <div className="d-flex justify-content-center">
                    <Image
                        src={IconReglement.src}
                        width={IconReglement.width}
                        height={IconReglement.height}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <div className="container">
                        <h3>Votre site internet est-il conforme à la réglementation ?</h3>

                        <p className="accroche">Mentions légales, conditions générales de vente, droit de rétractation… Votre site Internet est-il en règle ? Est-il déjà en ligne ou envisagez-vous de le créer ? Dans tous les cas, vérifiez notre check list des règles à respecter sur la toile.</p>
                        <div className="container-img">
                            <p>
                                Mentions légales, conditions générales de vente, droit de rétractation… Votre site Internet est-il conforme à la législation ?<br />
                                <span className="credit-photo">
                                    ©&nbsp;Wavebreakmedia/Thinkstock</span>
                            </p>
                        </div>
                        <h2>Les mentions légales du site internet</h2>

                        <p><strong>Selon la loi pour la confiance dans l’économie numérique de 2004, certaines mentions légales doivent figurer sur votre site Internet.&nbsp;</strong></p>

                        <p>Vous devez tout d’abord indiquer principalement :</p>

                        <ul>
                            <li>pour un entrepreneur individuel&nbsp;: vos nom, prénoms et domicile</li>
                            <li>pour une société, dénomination sociale ou raison sociale, forme juridique, adresse du siège social, montant du capital social</li>
                            <li>le numéro d’immatriculation au Registre du commerce et des Sociétés principalement pour les sociétés commerciales et les commerçants individuels</li>
                            <li>le numéro de Répertoire des Métiers pour les sociétés ayant une activité artisanale ou pour les artisans individuels</li>
                            <li>en cas de profession réglementée&nbsp;: le titre professionnel et un renvoi aux règles professionnelles en vigueur&nbsp;; si une autorisation d’exercer est indispensable, les coordonnées de l’autorité l’ayant délivrée.</li>
                            <li>le numéro de téléphone et adresse de courrier électronique</li>
                            <li>le numéro de TVA intracommunautaire (numéro individuel d’identification fiscale)</li>
                            <li>le nom du responsable de la publication. Cette personne est responsable pénalement de tout ce qui est publié sur le site</li>
                        </ul>

                        <p>Enfin, affichez le nom, la dénomination ou la raison sociale, l’adresse, le numéro d’immatriculation au RCS, le numéro de téléphone de l’hébergeur. &nbsp;</p>

                        <p>Toutes ces informations sont souvent accessibles en bas de page. En cas de contrôle par la Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes (DGCCRF), la non-conformité aux exigences légales des mentions figurant sur le site expose les personnes physiques jusqu’à 1 an de prison et jusqu’à 75&nbsp;000 euros d’amende et jusqu’à 375&nbsp;000 euros pour une société. De plus, une société risque une interdiction d’une durée maximum de 5 ans d’exercer directement ou indirectement une activité professionnelle dans le cadre de laquelle a été commise l’infraction.</p>

                        <p>A noter&nbsp;: par l’apparition d’un bandeau sur le site, l’internaute doit être informé des finalités des cookies utilisés, de la possibilité de s’y opposer et du fait que la poursuite de la navigation vaut accord au dépôt de cookies sur son ordinateur.</p>

                        <p>Pour en savoir plus, rendez-vous sur&nbsp;<u></u></p>
                    </div>
                </div>
            </div>
        </LayoutBlanc>
    )
}

export default Reglement;