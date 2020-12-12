import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { useFocusEffect } from '@react-navigation/native'

import api from "../../services/api";

import Header from '../../components/Header'
import Card from '../../components/NewCardProg'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "../../storage/actions/token";

import styles from './styles.js'

import { registerForPushNotifications } from '../../services/pushNotifications'

function Programacao({ navigation, room, token }) {

	const [programas, setProgramas] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);

	function load() {
		setRefreshing(true)
		api.get(`app/programacao?app=true&limit=${room.chkt}`)
			.then((result) => {
				let progs = [];
				result.data.data.forEach(d => {
					let data = d.data.split(' ');
					let dataSplit = data[0].split('/')
					progs.push({ id: d.id, title: d.descricao, data: dataSplit[0] + '/' + dataSplit[1], hora: data[1] });
				})
				setProgramas(progs);
				setRefreshing(false)
			})
			.catch((err) => {
				setRefreshing(false)
				Alert.alert(
					'Ops',
					'Aconteceu alguma coisa estranha, tente novamente.',
					[
						{
							text: "OK"
						}
					]
				);
			});
	}

	useEffect(() => {
		load();
		registerForPushNotifications(room);
	}, []);

	const onRefresh = React.useCallback(() => {
		load()
	}, []);

	let body;
	if (programas.length > 0)
	{
		body = programas.map(pro => <Card key={pro.id} item={pro} horizontal />)
	} else
	{
		body = (
			<Text style={{ fontFamily: 'montserrat-regular', marginTop: 30 }} center muted>
				Em breve publicaremos nossa {"\n"} programação :)
			</Text>
		)
	}

	return (
		<Block flex style={{ flexDirection: 'column' }}>
			<Block style={{ marginBottom: theme.SIZES.BASE }}>
				<Header
					title="PROGRAMAÇÃO"
					logout={true}
					navigation={navigation}
					bgColor="#F4AE00"
					titleColor="white"
					iconColor="white"
					white={true}
				/>
			</Block>
			<Block flex>
				<ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}
				/>}>
					<Block style={styles.container}>
						{body}
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

export default connect(mapStateToProps, mapDispatchToProps)(Programacao);
