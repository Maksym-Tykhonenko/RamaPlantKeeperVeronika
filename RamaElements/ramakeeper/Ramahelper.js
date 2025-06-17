import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from 'react';

const useRamaNaviKeeper = () => {
    const navigation = useNavigation();
    const [ramanaviitem, setRamanaviitem] = useState('Ramacustomplants');

    const manageRamanaviitems = useCallback((route) => {
        navigation.navigate(route);
    }, [navigation]);

    useEffect(() => {
        const naviitemsHandler = () => {
            const state = navigation.getState();
            if (state?.routes?.length) {
                const currentRamanaviitem = state.routes[state.index];
                if (currentRamanaviitem?.name) {
                    setRamanaviitem(currentRamanaviitem.name);
                }
            }
        };

        naviitemsHandler();

        const unsubscribe = navigation.addListener('state', naviitemsHandler);

        return unsubscribe;
    }, [navigation]);

    return { ramanaviitem, manageRamanaviitems };
};

export default useRamaNaviKeeper;