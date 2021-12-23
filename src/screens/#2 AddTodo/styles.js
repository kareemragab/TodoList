import {StyleSheet, I18nManager, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: wp(100),
    height: hp(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  SafeAreaView: {flex: 1, backgroundColor: '#fff'},
  flex: {
    flex: 0,
  },
  row: {
    flexDirection: 'row',
  },
  headerStyle: {
    width,
    height: 100,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  textHomeSty: {color: '#18181b', fontWeight: 'bold', fontSize: 28},
  touchableHeaderSty: {
    backgroundColor: '#84cc16',
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSty: {color: '#20232A', fontSize: 25},

  borderedField: {
    width: '90%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 22,
    paddingTop: 12,
  },

  textInputAlign: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    justifyContent: 'flex-start',
  },
  textInput: {
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 0,
    height: 40,
    paddingHorizontal: 14,
    backgroundColor: '#a1a1aa',
    color: '#000',
  },
  textareaContainer: {
    height: 150,
    padding: 8,
    backgroundColor: '#a1a1aa',
    borderRadius: 8,
    paddingLeft: 12,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  loginBtn: {
    width: '90%',
    backgroundColor: '#84cc16',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: '60%',
    alignSelf: 'center',
  },
  loginBtnTxt: {
    alignSelf: 'center',
    fontSize: RFValue(18),
    color: '#18181b',
    fontWeight: 'bold',
  },
});
