import React from 'react'
import { Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ComponenteHeader = ({ navigation }) => (
    <SafeAreaView>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name={Platform.OS == 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={24}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = {
    header: {
        minHeight: 20,
        marginTop: Platform.OS == 'ios' ? 0 : 20,
        padding: 10,
    }
}

export default ComponenteHeader;