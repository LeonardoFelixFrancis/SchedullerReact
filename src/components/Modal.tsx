import {
    Dialog,
    DialogContent,
    DialogTrigger
} from '@/components/ui/dialog';
import type React from 'react';

type Props = {
    children: React.ReactNode,
    open: boolean,
    setOpen: (value: boolean) => void;
}

export default function Modal({ children, open, setOpen }: Props){
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
              {children}
            </DialogContent>
        </Dialog>
    )
}