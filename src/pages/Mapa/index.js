import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import { Image, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import Header from '../../components/Header'

import api from '../../services/api'

import styles from "./styles";

import mapMarker from '../../../assets/imgs/map-icon.png'

function Mapa() {

	const [points, setPoints] = useState([])

	useEffect(() => {
		api
			.get("map")
			.then((result) => {
				setPoints(result.data.data);
			})
			.catch((err) => {
				Alert.alert(
					'Ops',
					'Não conseguimos contato com os servidores, tente novamente em alguns minutos',
					[
						{
							text: "OK"
						}
					]
				);
			});
	}, [])

	return (
		<Block flex style={{ flexDirection: 'column' }}>
			<Block >
				<Header
					title="MAPA"
					logout={true}
					navigation={useNavigation}
					bgColor="#F4AE00"
					titleColor="white"
					iconColor="white"
					white={true}
				/>
			</Block>

			<Block flex>
				<MapView
					provider={PROVIDER_GOOGLE}
					mapType={'satellite'}
					style={styles.map}
					initialRegion={{
						latitude: -27.3370651,
						longitude: -48.534479,
						latitudeDelta: 0.002,
						longitudeDelta: 0.002,
					}}
				>

					{
						points.map(point => (
							<Marker key={point.id} icon={mapMarker} coordinate={{ latitude: Number(point.latitude), longitude: Number(point.longitude) }} calloutAnchor={{ x: 2.5, y: 0.25 }}>
								<Callout tooltip={true}>
									<Block style={{
										backgroundColor: '#fff',
										borderTopRightRadius: 16,
										borderTopLeftRadius: 16,
										borderBottomRightRadius: 16,
										width: 200
									}}>
										<Block style={{
											padding: 10
										}}>
											<Text h5>{point.nome}</Text>
											<Text muted>{point.atendimento}</Text>

										</Block>
										<Block flex style={{
											elevation: 1,
											overflow: 'hidden'
										}}>
											<Image key={point.image_1} source={{ uri: point.image_1 }} resizeMode="cover" style={{ width: '100%', height: 100, borderBottomRightRadius: 16 }} />
										</Block>
									</Block>
								</Callout>
							</Marker>
						))
					}

				</MapView>
			</Block>

		</Block>
	);
}

export default Mapa;
