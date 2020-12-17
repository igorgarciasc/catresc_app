import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { Block } from "galio-framework";
import Header from '../../components/Header'
import styles from './styles'
import Card from '../../components/NewCard'

import { useFocusEffect } from '@react-navigation/native'

import api from '../../services/api'
import ExperienciaModal from './modal'

import { connect } from "react-redux";

import { verifyCheckout } from '../../services/register';

function Experiencia({ navigation, room }) {

	const [refreshing, setRefreshing] = useState(false);
	const [experiencias, setExperiencias] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedExperience, setSelectedExperience] = useState({})

	function load(setRefreshingValue = true) {
		setRefreshing(setRefreshingValue)
		api.get(`app/experiencia?limit=${room.chkt}`)
			.then((result) => {
				setExperiencias(result.data.data);
				setRefreshing(false)
			})
			.catch((err) => {
				Alert.alert(
					'Ops',
					'Não conseguimos contato com os servidores, tente novamente em alguns minutos',
					[{ text: "OK", onPress: () => { setRefreshing(false) } }]
				);
			});
	}

	useEffect(() => {
		load();
		(async () => {
			await verifyCheckout(room, navigation);
		})();
		navigation.addListener('focus', () => {
			load();
		});
	}, []);

	const onRefresh = React.useCallback(() => {
		load()
	}, []);

	const handleClickExperiencia = (id) => {
		setSelectedExperience(experiencias.find(e => e.id === id))
		setShowModal(true)
	}

	return (
		<Block flex style={{ flexDirection: 'column' }}>
			<Block >
				<Header
					title="EXPERIÊNCIA"
					logout={true}
					navigation={navigation}
					bgColor="#F4AE00"
					titleColor="white"
					iconColor="white"
					white={true}
				/>
			</Block>
			<Block flex>
				<ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
					<Block style={styles.container}>
						{
							experiencias.map(experiencia => <Card key={experiencia.id} item={{ title: experiencia.nome, subtitle: `${experiencia.duracao} minutos`, image: experiencia.image, body: experiencia.descricao, cta: 'Clique para agendar', valor: experiencia.valor }} horizontal onClick={() => handleClickExperiencia(experiencia.id)} />)
						}
					</Block>
				</ScrollView>
			</Block>
			<ExperienciaModal
				show={showModal}
				setShow={setShowModal}
				expirence={selectedExperience}
				room={room}
				onSuccess={() => load(false)}
			/>
		</Block>
	);
}

const mapStateToProps = (state) => ({
	room: state.room,
});

export default connect(mapStateToProps, null)(Experiencia);