import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import shadows from './../../assets/shadows';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(2.5),
  },
  headerTxt: {
    flex: 1,
    paddingHorizontal: wp(4),
    fontSize: RFValue(26),
    fontWeight: 'bold',
  },
  toggleContainerStyle: {
    marginHorizontal: wp(4),
  },
  toggleThumbBtn: {
    borderWidth: 0,
    width: 40,
    height: 40,
    radius: 20,
  },
  toggleTrackbarStyle: {
    activeBackgroundColor: '#9ee3fb',
    inActiveBackgroundColor: '#3c4145',
    borderActiveColor: '#86c3d7',
    borderInActiveColor: '#1c1c1c',
    width: 70,
    height: 32,
  },
  headerImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  topTabsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: wp(3),
  },
  tabItem: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: wp(1),
    justifyContent: 'center',
  },
  tabItemTxt: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal: 4,
    textAlign: 'center',
  },
  flatlist: {
    flexGrow: 1,
    paddingTop: 12,
  },
  itemView: {
    ...shadows[4],
    width: wp(92),
    padding: wp(4),
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 16,
  },
  bodyView: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  title: {
    width: '100%',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  date: {
    width: '100%',
    fontSize: RFValue(14),
    marginVertical: 4,
  },
  itemViewSkeleton: {
    width: wp(92),
    height: 60,
    alignSelf: 'center',
    padding: wp(4),
    marginBottom: 16,
  },
  titleSkeleton: {
    width: '75%',
    height: 16,
    borderRadius: 4,
    marginVertical: 6,
  },
  statusSkeleton: {
    width: '30%',
    height: 16,
    borderRadius: 4,
    marginVertical: 6,
  },
  addBtn: {
    backgroundColor: '#84cc16',
    height: wp(19),
    width: wp(19),
    position: 'relative',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    bottom: 52,
    borderRadius: 38,
    right: 16,
    alignItems: 'center',
    zIndex: 5,
    marginVertical: -42,
  },
  addBtnTxt: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
