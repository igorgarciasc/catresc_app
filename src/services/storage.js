import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (key, value) => {
	try
	{
		return await AsyncStorage.setItem(key, value);
	} catch (e)
	{
		console.log(e)
		return e
	}
};

const getData = async (key) => {
	try
	{
		return await AsyncStorage.getItem(key);
	} catch (e)
	{
		console.log(e)
		return e
	}
};

const removeData = async (key) => {
	try
	{
		const value = await AsyncStorage.removeItem(key);
		return value;
		if (value !== null)
		{
		}
	} catch (e) { }
};

export { storeData, getData, removeData };
