import {useContext} from 'react';
import {GlobalSettingsContext} from '../contexts/GlobalSettingsContext';

export const useGlobalSettings = () => useContext(GlobalSettingsContext);
