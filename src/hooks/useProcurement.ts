import {useContext} from 'react';
import {ProcurementContext} from 'src/contexts/ProcurementContext';

export const useProcurement = () => useContext(ProcurementContext);
