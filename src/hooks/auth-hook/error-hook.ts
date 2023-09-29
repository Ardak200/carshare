import { useCallback } from 'react';

// Hook defined thinking in the future. Actually it does not behave as a hook.
export const useErrorHandler = (hookOptions = {}) => {
    /**
     * Error handler
     *
     * En la función se define el flujo de la aplicación en caso de un error.
     *
     * @param {String | Object | Error} error
     * @returns {String[2]}
     *
     */
    const handleError = useCallback((error:unknown, options?:any) => (
        // use error and options here
        ['message', '']
    ), []);

    return {
        handleError,
    };
};

export default { useErrorHandler };