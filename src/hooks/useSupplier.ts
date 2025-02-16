import {useContext} from 'react';
import {SupplierContext} from 'src/contexts/SupplierContext';

export const useSupplier = () => useContext(SupplierContext);
