import { useEffect } from "react";

export function useOutsideClick(ref: React.RefObject<HTMLDivElement> | null | undefined, onClickOutside: () => void) {
    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            if (ref?.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, onClickOutside])
}