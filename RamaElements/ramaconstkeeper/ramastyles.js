import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');


export const shared = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%'
    },

    row: {
        width: '100%',
        flexDirection: 'row'
    },

    addButton: {
        width: 66,
        height: 66,
        borderRadius: 300,
        backgroundColor: '#E8BB08',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: height * 0.17,
        right: 0,
        zIndex: 10
    },

    addIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },

    ramadecor: {
        width: 326,
        height: 270,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: height * 0.12,
        left: 50
    },

    logo: {
        width: width,
        height: 400,
        resizeMode: 'contain',
    }

});


export const navi = StyleSheet.create({

    container: {
        width: width,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 40,
        backgroundColor: '#272727',
        borderTopWidth: 0.5,
        borderTopColor: '#5E5E5E',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    button: {
        width: '25%',
        borderRadius: 24,
        alignItems: 'center',
        padding: 8
    },

    icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        marginBottom: 10
    },

    text: {
        fontSize: 10,
        fontWeight: '600',
        color: '#fff'
    }

});


export const background = StyleSheet.create({

    heading: {
        position: 'absolute',
        top: 0,
        width: width,
        zIndex: 10
    },

    navi: {
        position: 'absolute',
        bottom: 0,
        width: width,
        zIndex: 10
    },

    keeper: {
        width: width,
        height: height,
        backgroundColor: '#000',
        paddingTop: 120,
        paddingHorizontal: 16
    },

});


export const heading = StyleSheet.create({

    container: {
        width: width,
        paddingTop: height * 0.08,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#272727',
        borderBottomWidth: 0.5,
        borderBottomColor: '#5E5E5E',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    backArrow: {
        width: 17,
        height: 22,
        resizeMode: 'contain',
        marginRight: 10
    },

    text: {
        color: '#fff'
    },

});


export const form = StyleSheet.create({

    label: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 8
    },

    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        color: '#000',
        fontWeight: '400',
        fontSize: 12
    },

    coverButton: {
        width: '100%',
        height: 180,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 16,
        marginBottom: 24
    },

    cover: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    plusIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
    },

    plantIcon: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
    },

    notifIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 15
    },

    condButton: {
        paddingVertical: 8,
        width: 166,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },

    condButtonText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000',
    },

    saveButton: {
        width: '100%',
        backgroundColor: '#DC0912',
        borderRadius: 100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },

    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    }

});


export const element = StyleSheet.create({

    container: {
        width: '100%',
        borderRadius: 20,
        padding: 16,
        backgroundColor: '#272727',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    cover: {
        width: 113,
        borderRadius: 16,
        height: 113,
        resizeMode: 'cover'
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },

    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 8
    },

    readButton: {
        padding: 8,
        width: 162,
        borderRadius: 100,
        backgroundColor: '#FDB938',
        alignItems: 'center',
        justifyContent: 'center'
    },

    readButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },

    tagBox: {
        padding: 4,
        width: 75,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tagText: {
        fontSize: 10,
        fontWeight: '400',
        color: '#fff',
    }

});


export const info = StyleSheet.create({

    trash: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        zIndex: 10,
        alignSelf: 'flex-end',
        marginBottom: 16
    },

    cover: {
        width: '100%',
        height: height * 0.3,
        resizeMode: 'cover',
        borderRadius: 32,
        marginBottom: 16
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 32
    },

    greyBox: {
        width: '100%',
        backgroundColor: '#272727',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16
    },

    greBoxText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8
    },

    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 8
    },

    reminderContainer: {
        width: '100%',
        backgroundColor: '#272727',
        borderRadius: 16,
        padding: 16
    },

    smallCover: {
        width: 113,
        height: 113,
        resizeMode: 'cover',
        borderRadius: 16,
        marginBottom: 8
    }

});


export const game = StyleSheet.create({

    playButton: {
        width: 170,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#000',
        backgroundColor: '#F9CF22',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 200
    },

    playButtonText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000',
    }

});