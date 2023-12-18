import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'inPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_ADMIN_KEY = 'inAdmin';
export const IsAdmin = () => SetMetadata(IS_ADMIN_KEY, true);
