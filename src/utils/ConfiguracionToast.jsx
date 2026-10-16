import Toast from 'react-native-toast-message';

export const toastConfig = {
    error: (props) => (
        <Toast
            {...props}
            text1NumberOfLines={0}
            text2NumberOfLines={0}
            style={{
                height: 'auto',
                minHeight: 60,
                paddingVertical: 12,
            }}
        />
    ),
    success: (props) => (
        <Toast
            {...props}
            text1NumberOfLines={0}
            text2NumberOfLines={0}
            style={{
                height: 'auto',
                minHeight: 60,
                paddingVertical: 12,
            }}
        />
    ),
};