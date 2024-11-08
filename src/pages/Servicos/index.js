import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { Block } from "galio-framework";
import Spinner from 'react-native-loading-spinner-overlay';

import Header from '../../components/Header'
import api from "../../services/api";
import Card from '../../components/NewCard'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "../../storage/actions/token";

import styles from './styles'

import { verifyCheckout } from '../../services/register';

function Servicos({ navigation, room, token, emptyToken }) {

	const [servicos, setServicos] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [spinner, setSpinner] = useState(false)

	function load() {
		setRefreshing(true)
		api
			.get("app/servico")
			.then((result) => {
				setServicos(result.data.data);
				setRefreshing(false)
			})
			.catch((err) => {
				Alert.alert(
					'Ops',
					'Não conseguimos contato com os servidores, tente novamente em alguns minutos',
					[
						{
							text: "OK",
							onPress: () => { setRefreshing(false) }
						}
					]
				);
			});
	}

	useEffect(() => {
		load()
		verifyCheckout(navigation, room)
		navigation.addListener('focus', () => {
			load();
		});
	}, []);

	const onRefresh = React.useCallback(() => {
		load()
	}, []);

	function handleClickService(id) {
		const dateCheckout = new Date(room.chkt);
		if ((!room.number) || (dateCheckout <= Date.now()))
		{
			emptyToken();
			navigation.navigate("Onboarding");
		} else
		{
			Alert.alert(
				'Confirmação',
				'Tem certeza que deseja solicitar esse serviço?',
				[
					{
						text: "Cancelar",
						style: "cancel"
					},
					{
						text: "OK",
						onPress: () => {
							setSpinner(true)
							api.post('app/solicitacao', { servico: id, solicitante: room.number }, { headers: { Authorization: `Barer ${token.value}` } }).then((result) => {
								Alert.alert('Serviço solicitado com sucesso!', '', [
									{ text: "Ok", onPress: () => setSpinner(false) }
								]);
							}).catch(err => {
								console.log(err)
								Alert.alert('Ops, não conseguimos enviar sua solicitação, tente novamente em alguns minutos!', '', [
									{ text: "Ok", onPress: () => setSpinner(false) }
								]);
							})
						}
					}
				]
			);
		}
	}

	return (
		<Block flex style={{ flexDirection: 'column' }}>
			<Spinner
				visible={spinner}
				textContent={'Solicitando...'}
				textStyle={{ color: '#FFF' }}
			/>
			<Block >
				<Header
					title="SERVIÇOS"
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
							servicos.map(servico => <Card key={servico.id} item={{ title: servico.nome, image: servico.image, body: servico.descricao, cta: 'Clique para solicitar' }} horizontal onClick={() => handleClickService(servico.id)} />)
						}
					</Block>
				</ScrollView>
			</Block>

		</Block>
	);
}


const mapStateToProps = (state) => ({
	room: state.room,
	token: state.token
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(Object.assign(TokenActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Servicos);