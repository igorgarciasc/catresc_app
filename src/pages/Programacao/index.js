import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Block, theme } from "galio-framework";

import api from "../../services/api";

import Header from '../../components/Header'
import Card from '../../components/NewCardProg'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "../../storage/actions/token";

import styles from './styles.js'

function Programacao({ navigation, room, emptyToken }) {

	const [programas, setProgramas] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);

	function load() {
		setRefreshing(true)

		api
			.get(`programacao?app=true&limit=${room.chkt}`)
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
		const dateCheckout = new Date(room.chkt);
		if ((!room.number) || (dateCheckout <= Date.now()))
		{
			emptyToken();
			navigation.navigate("Onboarding");
		}
		load()
	}, []);

	const onRefresh = React.useCallback(() => {
		load()
	}, []);

	return (
		<Block flex style={{ flexDirection: 'column' }}>
			<Block style={{ marginBottom: theme.SIZES.BASE }}>
				<Header
					title="PROGRAMAÇÃO"
					logout={true}
					navigation={useNavigation}
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

						{
							programas.map(pro => <Card key={pro.id} item={pro} horizontal />)
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

export default connect(mapStateToProps, mapDispatchToProps)(Programacao);
