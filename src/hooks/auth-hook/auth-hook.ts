import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useKeycloak } from '@react-keycloak/web';

import { commonNotification } from './common';
import {KeycloakProfile} from "keycloak-js";

/**
 * Returns the auth info and some auth strategies.
 *
 */
export const useAuth = () => {
    const {keycloak,initialized} = useKeycloak();
    const setNotification = useSetRecoilState(commonNotification);

    const [user, setUser] = useState<KeycloakProfile>({});

    // fetch user profile
    useEffect(() => {
        if (!initialized) {
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const userProfile = await keycloak.loadUserProfile();

                setUser({ ...userProfile});
            } catch (err) {
                setNotification({ isVisible: true, message: "err.message" });
            }
        };

        if (keycloak.authenticated) {
            fetchUserInfo();
        }
    }, [keycloak, initialized]);

    return {
        isAuthenticated: !!keycloak.authenticated,
        initialized,
        meta: {
            keycloak,
        },
        token: keycloak.token,
        user,
        roles: keycloak.realmAccess,
        login: useCallback(() => { keycloak.login(); }, [keycloak]),
        logout: useCallback(() => { keycloak.logout(); }, [keycloak]),
        register: useCallback(() => { keycloak.register(); }, [keycloak]),
    };
};

export default {
    useAuth,
};