import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from 'react-native';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Images } from './src/constants';

import { Provider } from 'react-redux';
import { store, persistor } from './src/storage/index'
import { PersistGate } from 'redux-persist/integration/react'

import AppStack from "./src/routes/AppStack";

const assetImages = [
	Images.Onboarding,
	Images.Logo,
	Images.Pro,
	Images.NowLogo
];

function cacheImages(images) {
	return images.map(image => {
		if (typeof image === 'string')
		{
			return Image.prefetch(image);
		} else
		{
			return Asset.fromModule(image).downloadAsync();
		}
	});
}

function App() {

	const [isLoadindComplete, setIsLoadingComplete] = useState(false);
	const [fontLoaded, setFontLoaded] = useState(false);

	const loadResourcesAsync = async () => {
		await Font.loadAsync({
			'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
			'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
		});
		setFontLoaded(true);
		return Promise.all([...cacheImages(assetImages)]);
	};

	const handleLoadingError = error => {
		console.warn(error);
	};

	const handleFinishLoading = () => {
		if (fontLoaded)
		{
			setIsLoadingComplete(true);
		}
	};

	if (!isLoadindComplete)
	{
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={handleFinishLoading}
			/>
		);
	} else
	{
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AppStack />
					<StatusBar style="light" />
				</PersistGate>
			</Provider>);
	}

}

export default App;
