import { type ClassValue, clsx } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { toast } from '~/components/ui/use-toast';
import { EntityError } from '~/lib/http';
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
    error,
    setError,
    duration,
}: {
    error: any;
    setError?: UseFormSetError<any>;
    duration?: number;
}) => {
    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach(item => {
            setError(item.field, {
                type: 'server',
                message: item.message,
            });
        });
    } else {
        toast({
            title: 'Lỗi',
            variant: 'destructive',
            description: error?.payload?.message ?? 'Lỗi không xác dịnh!',
        });
    }
};

/**
 * Xoa di ky tu '/' dau tien cua @param path
 */
export const normalizePath = (path: string) => {
    return path.startsWith('/') ? path.slice(1) : path;
};

/**
 * decode JWT
 */
export const decodeJWT = <Payload = any>(token: string) => {
    return jwt.decode(token) as Payload;
};
