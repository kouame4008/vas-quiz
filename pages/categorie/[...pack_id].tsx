import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
    Section,
    SectionTop,
    SectionTopContent,
    ContentTxt,
    IntoTitle,
    IntoSubTitle,
} from '../../shared/components/welcome-css';

import Theme from '../welcome/components/card/Theme';
import LayoutBlanc from '../../shared/layouts/LayoutBlanc';

import IconCulture from '../../public/assets/theme/icon-culture_general.png';


import { ITheme } from '../api/config/interface/Interface';
import useCategorie from '../api/categorie/use-categories';
import { Spin } from 'antd';
import usePacksById from '../api/pack/use-pack-by-id';



export default function () {
    const router = useRouter();
    const { pack_id } = router.query;
    const [currentTheme, setCurrentTheme] = useState();
    const { categories, chargementCategories } = useCategorie();
    const { pack, chargementPack } = usePacksById(pack_id && pack_id[0])

    // hanlderedirectRoute de rediriger le user apres le choix d'un theme
    const hanlderedirectRoute = (item: ITheme) => {
        // item.id && router.push(`/welcome/${item.id}/${v4()}`)
        router.push('/quiz')
    }

    return (
        <LayoutBlanc>
            <Section>
                <SectionTop color='FFF'>
                    <Spin spinning={chargementPack}>
                        <SectionTopContent>
                            <Row className='pt-4'>
                                <Col md={4} xs={4}>
                                    <ContentTxt>
                                        <section>
                                            <IntoTitle style={{ fontSize: '56px', color: '#004E9C' }}>
                                                Vous avez choisi le {pack && pack.type_pack}
                                            </IntoTitle>
                                            <strong> Sélectionnez  un thème </strong>
                                            <IntoSubTitle style={{ color: '#000' }}>
                                                Sed ut perspiciatis unde omnis iste natus error
                                                sit voluptatem accusantium doloremque laudantium, totam rem
                                                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                            </IntoSubTitle>
                                        </section>
                                    </ContentTxt>
                                </Col>
                                <Col md={8} xs={4}>
                                    {/* Debut liste des themes */}
                                    <Spin spinning={chargementCategories}>
                                        <Row>
                                            {categories && categories.map((item: ITheme, it: number) => (
                                                <Col md={4} key={it} onClick={() => hanlderedirectRoute(item)}>
                                                    <Theme nom={item.nom} icon={IconCulture} />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Spin>
                                    {/* fin liste des themes */}
                                </Col>
                            </Row>
                        </SectionTopContent>
                    </Spin>
                </SectionTop>
            </Section>
        </LayoutBlanc>

    )
}
