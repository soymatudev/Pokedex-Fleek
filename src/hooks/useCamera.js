import { useCameraDevice, useCameraPermission } from "react-native-vision-camera";

export const useCamera = () => {

    const startCameraService = () => {
        const device = useCameraDevice("wide-angle-camera");
        const { hasPermission } = useCameraPermission();

        return { device, hasPermission };
    };

    return {
        startCameraService
    };
}