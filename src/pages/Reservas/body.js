import React from 'react'
import Card from '../../components/CardReserve'
import { Block, Text } from "galio-framework";

function body({ styles, itens, handleClickCancelExperiencia }) {

    if (itens.length > 0)
    {
        return (
            <Block style={styles.container}>
                {
                    itens.map(reserva => <Card key={reserva.id} item={{ title: reserva.experiencia.nome, subtitle: reserva.experiencia.profissional, image: reserva.experiencia.image, data: reserva.data, hora: reserva.hora, cta: 'Clique para cancelar' }} horizontal onClick={() => handleClickCancelExperiencia(reserva.id)} />)
                }
            </Block>
        )
    } else
    {
        return (
            <Block style={styles.container}>
                <Text style={{ fontFamily: 'montserrat-regular', marginTop: 30 }} center muted>
                    Você não possui reservas.{"\n"}Que tal fazer uma agora?
                </Text>
            </Block>
        )
    }
}

export default body
