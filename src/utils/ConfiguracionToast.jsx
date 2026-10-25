import Toast from 'react-native-toast-message';

export const toastConfig = {
    error: (props) => {
        console.log('🔴 ENTRANDO EN TOAST CONFIG - ERROR', props);

        return (
            <Toast
                {...props}
                text1NumberOfLines={0}
                text2NumberOfLines={0}
                style={{
                    height: 'auto',
                    minHeight: 60,
                    backgroundColor: '#FFFFFF',
                    borderLeftColor: '#DC3545',
                    paddingVertical: 12,
                }}
            />
        );
    },

    success: (props) => {
        console.log('🟢 ENTRANDO EN TOAST CONFIG - SUCCESS', props);

        return (
            <Toast
                {...props}
                text1NumberOfLines={0}
                text2NumberOfLines={0}
                style={{
                    height: 'auto',
                    minHeight: 60,
                    backgroundColor: '#FFFFFF',
                    borderLeftColor: '#28A745',
                    paddingVertical: 12,
                }}
            />
        );
    },
};