import React from 'react';
import { StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';
import { BorderlessButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import nowTheme from '../../constants/Theme';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "../../storage/actions/token";

const { height, width } = Dimensions.get('window');

const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

function Header({ title, transparent, bgColor, titleColor, logout, emptyToken }) {

  const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null
  ];

  const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];
  const { navigate } = useNavigation();

  function handleLogout() {
    emptyToken()
    navigate("Onboarding");
  }

  return (
    <>
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          left={(<></>)}
          right={(logout && <BorderlessButton onPress={handleLogout}>
            <FontAwesome5 name="sign-out-alt" size={20} color='#fff' />
          </BorderlessButton>
          )}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS['WHITE'] },
            titleColor && { color: titleColor }
          ]}
        />
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative'
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular'
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Object.assign(TokenActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);