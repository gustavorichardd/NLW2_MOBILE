import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    justifyContent: 'center',
    padding: 40,
  },
  banner:  {
    width: '100%',
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80
  },
  titleBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  buttonContainer: {
    flexDirection:'row',
    marginTop: 40,
    justifyContent: 'space-between'
  },
  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between'
  },
  buttonPrimary: {
    backgroundColor: '#9871f5'
  },
  buttonSecondary: {
    backgroundColor: '#04D361'
  },
  buttonText: {
    fontFamily: 'Archivo-Bold',
    color: '#FFF',
    fontSize: 20
  },
  totalConnections: {
    fontFamily: 'Popping-Regular',
    color: '#D4C2FF',
    fontSize: 12,
    lineHeight: 20,
    maxHeight: 140,
    marginTop: 40
  },
})

export default styles;