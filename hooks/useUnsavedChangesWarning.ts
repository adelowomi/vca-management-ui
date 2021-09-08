import { useRouter } from 'next/router';
import { useEffect } from "react";


const useUnsavedChangesWarning = (
    isDirty
) => {
    const router = useRouter();
    const message = "Are you sure want to discard changes?";

    useEffect(() => {
        //Detecting browser closing
        window.onbeforeunload = isDirty && (() => message);

        return () => {
            window.onbeforeunload = null;
        };


    }, [isDirty]);


    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            if (!isDirty) return;

            if (window.confirm('Are you sure you want to leave?\nChanges you made may not be saved.'))
                isDirty = true;
            else {
                router.events.emit('routeChangeError');
                throw 'routeChange aborted.';
            }
        });

    }, [isDirty]);



};

export default useUnsavedChangesWarning;
